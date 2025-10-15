'use server'
import { businessAuth } from "@/lib/auth";
import prisma from "@/lib/db"
import { BusinessSocialLinks, businessSocialLinksSchema, LocationSettings, locationSettingsSchema } from "@/lib/schema";

// DASHBOARD/SETTINGS/DETAILS => used in modal, to edit business name
export const editBusinessName = async (businessName: string) => {
  try {
    const business = await businessAuth()
    if(!business.success) return {success: false, message: "Brak autoryzacji. Zaloguj się"}
    
    const editResult = await prisma.business.update({
          where: {
            id: business.id,
          },
          data: {name: businessName}
    })

    if(!editResult) return {success: false, message: "Wystąpił problem podczas zmiany nazwy kategorii"}
    return {success: true, message:"Zapisano", data: editResult}
    
    } catch(error){
        return {success: false, message: "Wystąpił problem podczas zmiany nazwy kategorii: " + error}
    }
}

// DASHBOARD/SETTINGS/LOCATION => used in modal, to edit business name
export const updateBusinessLocation = async (locationData:LocationSettings) => {
  try {
    const business = await businessAuth()
    if(!business.success) return {success: false, message: "Brak autoryzacji. Zaloguj się"}

    const isDataValid = locationSettingsSchema.safeParse(locationData)
    if(!isDataValid.success)  return {success: false, message: "Wystąpił problem podczas walidacji danych"}

    const editResult = await prisma.business.update({
          where: {
            id: business.id,
          },
          data: {
            street: locationData.street,
            district: locationData.district,
            town: locationData.town,
            zipcode: locationData.zipcode,
        }
    })

    if(!editResult) return {success: false, message: "Wystąpił problem podczas zmiany nazwy kategorii"}
    return {success: true, message:"Zapisano", data: editResult}
    
    } catch(error){
        return {success: false, message: "Wystąpił problem podczas zmiany nazwy kategorii: " + error}
    }
}

// DASHBOARD/SETTINGS/LINKS => used in modal, to edit business name
export const updateBusinessSocialMediaLinks = async (linksData:BusinessSocialLinks) => {
  try {
    const business = await businessAuth()
    if(!business.success) return {success: false, message: "Brak autoryzacji. Zaloguj się"}

    const isDataValid = businessSocialLinksSchema.safeParse(linksData)
    if(!isDataValid.success)  return {success: false, message: "Wystąpił problem podczas walidacji danych"}

    const editResult = await prisma.business.update({
          where: { id: business.id },
          data: {
            facebookUrl:linksData.facebookUrl,
            instagramUrl: linksData.instagramUrl,
            websiteUrl: linksData.websiteUrl,
        }
    })

    if(!editResult) return {success: false, message: "Wystąpił problem podczas zmiany nazwy kategorii"}
    return {success: true, message:"Zapisano", data: editResult}
    
    } catch(error){
        return {success: false, message: "Wystąpił problem podczas zmiany nazwy kategorii: " + error}
    }
}

// DASHBOARD/SETTINGS/WORKING-DAYS => getting wokking hours data for business
export const getBusinessWorkingHours = async () => {
  try {
    const business = await businessAuth()
    if(!business.success) return {success: false, message: "Brak autoryzacji. Zaloguj się"}
    
    const workingTimeData = await prisma.workingDay.findMany({
          where: { serviceId: business.id },
          select: {
            dayOfWeek: true,
            close: true,
            isOpen:true,
            open: true
          }
      })

      const dayOrder = {
        Poniedziałek: 1,
        Wtorek: 2,
        Środa: 3,
        Czwartek: 4,
        Piątek: 5,
        Sobota: 6,
        Niedziela: 7
      };

      const sortedWeek = workingTimeData.sort(
        (a, b) => dayOrder[a.dayOfWeek] - dayOrder[b.dayOfWeek]
      );

      if(!workingTimeData) return {success: false, message: "Wystąpił problem podczas pobierania danych: "}
      return {success: true, data: sortedWeek}
  }
  catch (error) {
    console.error(error)
    return {success: false, message: "Wystąpił problem podczas pobierania danych"}
  }
}

type SetWorkingTimeDataDaysDataProps =  {
  isOpen: boolean
  open: string
  close: string
  dayOfWeek: string
}[]

// DASHBOARD/SETTINGS/WORKING-DAYS => used in modal, to edit woking time hours
export const updateBusinessWorkingHours = async (daysData:SetWorkingTimeDataDaysDataProps) => {
  try {
    const business = await businessAuth()
    if(!business.success) return {success: false, message: "Brak autoryzacji. Zaloguj się"}

    const updateWorkingHoursPromise = daysData.map((dayData) => {
      return prisma.workingDay.update({
        where: {
          serviceId_dayOfWeek: {
            serviceId: business.id,
            dayOfWeek: dayData.dayOfWeek
          },
        },
        data: {
          isOpen: dayData.isOpen,
          open: dayData.open,
          close: dayData.close,
        }
      })
    })

    const updateWorkingHoursResult = await Promise.all(updateWorkingHoursPromise);
    if(!updateWorkingHoursResult) return {success: false, message: "Wystąpił problem podczas aktualizacji godzin pracy"}
    return {success: true, message:"Zapisano", data: updateWorkingHoursResult}
  }catch(error){
    return {success: false, message: "Wystąpił problem podczas aktualizacji godzib pracy: " + error}
  }
}

// DASHBOARD/SETTINGS/GALLERY => getting images for settings gallery
export const getBusinessGalleryImages = async () => {
  try{
    const business = await businessAuth()
    if(!business.success) return {success: false, message: "Brak autoryzacji. Zaloguj się"}
    
    const businessImagesResult = await prisma.image.findMany({ where: {businessId: business.id}})
    if(!businessImagesResult) return {success: false, message: "Wystąpił problem podczas pobierania zdjęć"}
    return {success: true, data:businessImagesResult }
  }catch(error){
    return {success: false, message: "Wystąpił problem podczas pobierania zdjęć" + error}
  }
}


// DASHBOARD/SETTINGS/GALLERY => used in modal, to edit woking time hours
export const deleteBusinessGalleryImage = async (photoId: string) => {
  try {
    const business = await businessAuth()
    if(!business.success) return {success: false, message: "Brak autoryzacji. Zaloguj się"}
    
    const deleteImageResponse = await prisma.image.delete({where: { id: photoId }})
    if (!deleteImageResponse) return { success: false, message: "Wystąpił problem podczas usuwania zdjęcia" }
    return { success: true, message: "Usunięto", data: deleteImageResponse }
  } catch (error) {
    return { success: false, message: "Wystąpił problem podczas usuwania zdjęcia" + error}
  }
}

// READY
// DASHBOARD/SETTINGS/VISIBILITY 
// TAKES CURRENT STATE OF ADDED IAMGES, ADDED SERVICES, AND CURRENT PUBLICITY STATE
export const getDataForPublicityCheck = async () => {
  try {
    const business = await businessAuth()
    if(!business.success) return {success: false, message: "Brak autoryzacji. Zaloguj się"}

    const response = await prisma.business.findFirst({
      where: { id: business.id },
      select: {
        _count: {
          select: {
            images: true,
            services: {
              where: {
                archived: false
              }
            }
          }
        },
        isPublic: true,
      }
    })

    const data = {
      imageCount:response._count.images,
      serviceCount: response._count.services,
      isPublic: response.isPublic
    }
    
    return {  success: true, data: data }
  } catch (error) {
    console.error(error)
    console.log("Wystąpił błąd podczas pobierania danych")
  }
}

// READY
// DASHBOARD/SETTINGS/VISIBILITY 
// TAKES CURRENT BUSINESS PUBLICITY STATE, AND REVESES IT
export const toggleIsBusinessPublic = async (previousPublicState:boolean) => {
  try {
    const business = await businessAuth()
    if(!business.success) return {success: false, message: "Brak autoryzacji. Zaloguj się"}

    const response = await prisma.business.update({
      where: { id: business.id },
      data: { isPublic: !previousPublicState },
      select:{ isPublic: true }
    })

    if(!response) return { success: false, message: "Wystąpił problem podczas zmiany statusu serwisu"}
    return { success: true, isPublic: response.isPublic }
  } catch (error) {
    console.error(error)
    return { success: false, message: "Wystąpił problem podczas zmiany statusu serwisu" }
  }
}