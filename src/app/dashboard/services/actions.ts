'use server'
import { businessAuth } from "@/lib/auth";
import prisma from "@/lib/db";
import { Service } from "@/lib/types";

// DASHBOARD/SERVICES
// THIS FUNCTION IS USED TO GET ALL CATEGORIES AND SERVICES OF BUSINESS 
export const getBusinessServices = async () => {
  try {
    const business = await businessAuth()
    if(!business.success) return {success: false, message: "Brak autoryzacji. Zaloguj się"}
    
    const categoriesData = await prisma.categories.findMany({
          where: {
              serviceId: business.id,
              archived: false,
          },
          select: {
              id: true,
              name: true,
              services: {
                where: {
                  archived: false,
                },
                select: {
                  id: true,
                  name: true,
                  duration: true,
                  price: true,
                  categoryId: true,
                  description: true,
                }
              },
          },
          orderBy: { createdAt: "asc" }
      })

      return {success: true, data: categoriesData}
  } catch (error) {
      console.error(error)
      return {success: false, message: "Wystąpił problem z serwerem podczas pobierania danych o usługach"}
  }
}

// DASHBOARD/SERVICES => used in modal, to add category
export const addNewCategory = async (categoryName:string) => {
  try {
    const business = await businessAuth()
    if(!business.success) return {success: false, message: "Brak autoryzacji. Zaloguj się"}

      // CHECK WHETHER THE CATEGORY WITH THIS NAME EXISTS
      const isExisting = await prisma.categories.findFirst({
        where: { 
          serviceId: business.id, 
          name: categoryName,
          archived: false,
        }})
      if (isExisting)  return { success: false, message: "Kategoria juz istnieje"}

      const addNewCategoryResult = await prisma.categories.create({ data: { serviceId: business.id, name: categoryName }})
      if(!addNewCategoryResult) return {success: false, message: "Wystąpił problem podczas dodawania kategorii"}
      return { success: true, message: "Zapisano", data: addNewCategoryResult}
  } catch (error) {
      return {success: false, message: "Wystąpił problem podczas dodawania kategorii" + error}
  }
}

// DASHBOARD/SERVICES => used in modal, to edit category name
export const editCategoryName = async (categoryId:string, categoryName: string) => {
  try {
    const business = await businessAuth()
    if(!business.success) return {success: false, message: "Brak autoryzacji. Zaloguj się"}
    
    const editResult = await prisma.categories.update({
          where: {
            id: categoryId, 
            serviceId: business.id,
            archived:false,
          },
          data: {name: categoryName}
    })

    if(!editResult) return {success: false, message: "Wystąpił problem podczas zmiany nazwy kategorii"}
    return {success: true, message:"Dodano", data: editResult}
    
    } catch(error){
        return {success: false, message: "Wystąpił problem podczas zmiany nazwy kategorii: " + error}
    }
}

// DASHBOARD/SERVICES => used in modal, to delete category name
export const deleteCategory = async (categoryId:string) => {
  try {
    const business = await businessAuth()
    if(!business.success) return {success: false, message: "Brak autoryzacji. Zaloguj się"}

    const deleteCategoryResult = await prisma.categories.update({
      where: {id: categoryId}, 
      data:{archived: true}
    })

    const deleteRelatedServicesResult = await prisma.service.updateMany({
      where: {  
        categoryId: categoryId 
      }, 
      data:{archived: true}
    })

    if(!deleteCategoryResult || !deleteRelatedServicesResult) return {success: false, message: "Wystąpił problem podczas usuwania kategorii"}
    return {success: true, message:"Usunięto", data: deleteCategoryResult}
  } catch (error) {
      return {success: false, message: "Wystąpił problem podczas usuwania kategorii: " + error}
  }
}

// DASHBOARD/SERVICES => used in modal, to add new service
export const addNewService = async (serviceData:Service) => {
  try {
    const business = await businessAuth()
    if(!business.success) return {success: false, message: "Brak autoryzacji. Zaloguj się"}
    const businessId = await businessAuth()

    //checking whether service already exists
    const isServiceExisiting = await prisma.service.findFirst({
      where:{
        serviceId: business.id,
        name: serviceData.name,
        archived: false,
      }
    })

    if(isServiceExisiting) return {success: false, message: "Taka usługa już istnieje"}

    const addNewServiceResult = await prisma.service.create({
      data: {
        serviceId: businessId.id,
        categoryId: serviceData.categoryId,
        name: serviceData.name,
        price: serviceData.price,
        description: serviceData.description,
        duration: serviceData.duration,
      }
    })

    if(!addNewServiceResult) return {success: false, message: "Wystąpił problem podczas dodawania usługi"}
    return { success: true, message: "Dodano usługę", data: addNewServiceResult }
  }catch (error) {
    return {success: false, message: "Wystąpił problem podczas dodawania usługi" + error}
  }
}

// DASHBOARD/SERVICES => used in modal, to add edit exisitng service
export const editService = async (serviceData:Service) => {
  try {
    const business = await businessAuth()
    if(!business.success) return {success: false, message: "Brak autoryzacji. Zaloguj się"}
    const businessId = await businessAuth()

    const editServiceResult = await prisma.service.update({
      where: {id: serviceData.id},
      data: {
        serviceId: businessId.id,
        categoryId: serviceData.categoryId,
        name: serviceData.name,
        price: serviceData.price,
        description: serviceData.description,
        duration: serviceData.duration,
      }
    })

    if(!editServiceResult) return {success: false, message: "Wystąpił problem podczas modyfikowania usługi"}
    return { success: true, message: "Zapisano", data: editServiceResult }
  }catch (error) {
    return {success: false, message: "Wystąpił problem podczas modyfikowania usługi" + error}
  }
}

// DASHBOARD/SERVICES => used in modal, to delete service
export const deleteService = async (id:string) => {
  try {
    const business = await businessAuth()
    if(!business.success) return {success: false, message: "Brak autoryzacji. Zaloguj się"}
    
    const deletedService = await prisma.service.update({
      where: { id }, 
      data: {archived: true}
    })
    if(!deletedService) return {success: false, message: "Wystąpił problem podczas usuwania usługi"}
    return {success: true, message:"Usunięto", data: deletedService}
  } catch (error) {
      return {success: false, message: "Wystąpił problem podczas usuwania usługi: " + error}
  }
}