// actions/changePassword.ts
"use server"
import { businessAuth, logout } from "@/lib/auth"
import bcrypt from "bcryptjs"
import { ChangePasswordInput, changePasswordSchema, DashboardProfileEditPersonalData  } from "@/lib/schema"
import prisma from "@/lib/db"
import { deleteImageFromS3, uploadToS3 } from "@/lib/s3"


// DASHBARD/PROFILE ->  THIS FUNCTION CHECKS WHAT DATA IS PROVIDED, AND UPDATES DATABASE ACORINGINGLY
export const updateDashboardProfileData = async (oldData:DashboardProfileEditPersonalData, newData:DashboardProfileEditPersonalData) => {
  try {
    const business = await businessAuth()
    if(!business.success) return {success: false, message: "Brak dostępu. Zaloguj się"}

    const existingEmail = oldData.email !== newData.email 
      ? await prisma.business.findUnique({ where: { email: newData.email } })
      : null;
    if (existingEmail) return { success: false, message: "Konto z tym adresem email już istnieje" };

    const existingPhone = oldData.phone !== newData.phone 
      ? await prisma.business.findUnique({ where: { phone: newData.phone } })
      : null;
    if (existingPhone) return { success: false, message: "Konto z tym numerem telefonu już istnieje" };

    const updateDashboardProfileData = await prisma.business.update({
            where: { id: business.id },
            data: {
                owner: newData.owner,
                email: newData.email,
                phone: newData.phone,
            },
        });

    if(!updateDashboardProfileData) return {success: false, message: "Wystąpił problem podczas zapisywania danych."}
    return {success: true, data: updateDashboardProfileData}
  } catch (error) {
    console.error(error)
    return {success: false, message: "Wystąpił problem podczas zapisaywania danych." }
  }
}

// DASHBARD/PROFILE -> get user photo for modal view
export const getDashboardProfilePhotoEditModal = async () => {
  try {
    const business = await businessAuth()
    if(!business.success) return {success: false, message: "Brak dostępu. Zaloguj się"}
        
    const userImage = await prisma.business.findUnique({
      where: { id: business.id },
      select: { image: true }
    })

    if(!userImage) return {success: false, message: "Wystąpił problem podczas pobierania zdjęcia"}
    return {success: true, data: userImage.image}
  }catch(error){
    return {success: false, message: "Wystąpił problem podczas pobierania zdjęcia "+ error}
  }
}

// DASHBARD/PROFILE ->  creates link to client profile photo and puts it into database
export const uploadNewDashboardProfileImage = async (formData: FormData) => {
  try {
    const business = await businessAuth()
    if(!business.success) return {success: false, message:"Odmowa dostępu. Użytkownik niezalogowany"}
    const businessId = business.id

    const file = formData.get('image') as File;
    if (!file) return {success: false, message:"Brak pliku"}

    const {error, key} = await uploadToS3({file, userId:businessId})
    if(error) return  {success: false, message:"Wystąpił problem podczas przesyłania pliku na serwer"}
    const s3Link = `https://carfitapp.s3.eu-north-1.amazonaws.com/${key}`
        
    const putImage  = await prisma.business.update({
      where: { id: businessId},
      data: { image: s3Link }
    })

    if(!putImage) return  {success: false, message:"Wystąpił problem podczas zmiany zdjęcia"}
    return {success: true, data:putImage.image}
  }catch(error){
    return {success: false, message:`Wystąpił problem podczas przesyłania pliku na serwer ${error}`}
  }
}

// DASHBARD/PROFILE  -> deletes client profile photo
export const deleteDashboardProfileImage = async (imageUrl:string) => {
  try {
    if(!imageUrl) return { success: false, message: "Brak zdjęcia do usunięcia" }

    const business = await businessAuth()
    if(!business.success) return {success: false, message:"Odmowa dostępu. Użytkownik niezalogowany"}
    const businessId = business.id
    
    const deleteResult = deleteImageFromS3(imageUrl)
    if(!deleteResult) return {success: false, message:"Wystąpił problem z podczas usuwania zdjęcia"}
        
    const result = await prisma.business.update({ where: { id: businessId }, data: { image: null }})
    return { success: true, data: result.image }
  }catch(error){
    return {success: false, message:`Wystąpił problem podczas usuwania zdjęcia ${error}`}
  }
}

// DASHBARD/PROFILE -> function for changing client password 
export async function changeDashboardProfilePassword(data: ChangePasswordInput) {
    try{
        const auth = await businessAuth()
        if (!auth.success) return { success: false, message: "Dostęp zablokowany. Zaloguj się" }

        const parsed = changePasswordSchema.safeParse(data)
        if (!parsed.success) return { success: false, message: "Wypełnij pola poprawnie"}

        const { currentPassword, newPassword } = parsed.data
        
        // getting old password from db and checking whether user exists
        const user = await prisma.business.findUnique({ where: { id: auth.id }, select: { password: true }})
        if (!user) return { success: false, message: "Nie znaleziono użytkownika" }

        // checking is current password correct, and whether is the new password the same as old
        const isMatch = await bcrypt.compare(currentPassword, user.password)
        if (!isMatch) return { success: false, message: "Aktualne hasło jest nieprawidłowe" }
        const isSameAsCurrent = await bcrypt.compare(newPassword, user.password)
        if(isSameAsCurrent) return { success: false, message: "Nowe hasło nie może być takie samo jak aktualne." }

        // hashing new password and updating
        const newHashedPassword = await bcrypt.hash(newPassword, 10)
        const updatePassword = await prisma.business.update({ where: { id: auth.id }, data: { password: newHashedPassword }})

        if(!updatePassword) return { success: false, message: "Wystąpił problem podczas zmiany hasła" }
        return { success: true, message: "Hasło zostało zmienione" }

    }catch(error){
        return { success: false, message: "Wystąpił problem serwera podczas zmiany hasła" + error }
    }
}

// DASHBARD/PROFILE -> deletes client profile photo
export const deleteBusinessAccount = async () => {
    try {
        const user = await businessAuth()
        if(!user.success) return {success: false, message:"Odmowa dostępu. Użytkownik niezalogowany"}

        const result = await prisma.business.delete({ where: { id: user.id }})
        if(!result) return {success: false, message:`Wystąpił problem podczas usuwania konta`}
        logout()
        return { success: true, message:`Twoje konto zostało usunięte`}
    }catch(error){
        return {success: false, message: `Wystąpił problem podczas usuwania konta ${error}`}
    }
}