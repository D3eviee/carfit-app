// actions/changePassword.ts
"use server"
import { businessAuth } from "@/lib/auth"
import bcrypt from "bcryptjs"
import { ChangePasswordInput, changePasswordSchema, ChangePersonalDataInput, changePersonalDataSchema  } from "@/lib/schema"
import prisma from "@/lib/db"

// function for changing password 
export async function changePassword(data: ChangePasswordInput) {
  const auth = await businessAuth()
  if (!auth.success) return { success: false, message: "Użytkownik niezalogowany" }

  const parsed = changePasswordSchema.safeParse(data)
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.flatten().fieldErrors,
    }
  }

  const { currentPassword, newPassword } = parsed.data

  // getting old password from db and checking whether user exists
  const user= await prisma.business.findUnique({
    where: { id: auth.id },
    select: { password: true }
  })
  if (!user) return { success: false, message: "Nie znaleziono użytkownika" }


  // checking is current password correct, and whether is the new password the same as old
  const isMatch = await bcrypt.compare(currentPassword, user.password)
  const isSameAsCurrent = await bcrypt.compare(newPassword, user.password)
  if (!isMatch) return { success: false, message: "Aktualne hasło jest nieprawidłowe" }
  if(isSameAsCurrent) return { success: false, message: "Nowe hasło nie może być takie samo jak aktualne." }


  // hashing new password and updating
  const newHashedPassword = await bcrypt.hash(newPassword, 10)
  await prisma.business.update({
    where: { id: auth.id },
    data: { password: newHashedPassword },
  })
  return { success: true }
}

export async function changePersonalData(data: ChangePersonalDataInput) {
  const auth = await businessAuth()
  if (!auth.success) return { success: false, message: "Użytkownik niezalogowany" }

  const parsed = changePersonalDataSchema.safeParse(data)

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.flatten().fieldErrors,
    }
  }

  // updating data
  await prisma.business.update({
    where: { id: auth.id },
    data: { 
      owner: data.name,
      email: data.email,
      phone: data.phone
    },
  })
  
  return { success: true }
}

// function for deleting account
export async function deleteAccount() {
  const auth = await businessAuth()
  if (!auth.success) return { success: false, message: "Użytkownik niezalogowany" }

  // updating data
  await prisma.business.delete({
    where: { id: auth.id },
  })
  
  return { success: true }
}
