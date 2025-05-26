'use server'
import { businessAuth } from "@/lib/auth";
import prisma from "@/lib/db";

// get categories and services data for business
export const getServicesForBusiness = async () => {
  try {
    const business = await businessAuth()
    if(!business.success) return {success: false, message: "No-authenticated user. Access denied."}
    
    const categoriesData = await prisma.categories.findMany({
          where: {
              serviceId: business.id
          },
          select: {
              id: true,
              name: true,
              services: {
                  select: {
                      id: true,
                      name: true,
                      durationType: true,
                      from: true,
                      to: true,
                      duration: true,
                      price: true,
                      description: true
                  }
              },
          },
          orderBy: {
              createdAt: "asc"
          }
      })

      return {success: true, data: categoriesData}
  } catch (error) {
      return {success: false, message: "Server error occured while getting data: " + error}
  }
}

// add category for business
export const addNewCategory = async (categoryName:string) => {
  try {
      const businessId = await businessAuth();

      // WHETHER CATEGORY ALREADY EXISTS
      const isExisting = await prisma.categories.findFirst({
          where: { serviceId: businessId.id, name: categoryName}
      });

      if (isExisting) {
       return { success: false, message: "Kategoria juz istnieje" }
      }

      await prisma.categories.create({
        data: { serviceId: businessId.id, name: categoryName }
      })

      return { success: true, message: null};
  } catch (error) {
      return { success: false, message: "Błąd serwera: " + error};
  }
};

// edit category for business
export const editCategory = async (categoryId:string, categoryName: string) => {
  try {
      const businessId = await businessAuth()

      await prisma.categories.update({
          where: {id: categoryId, service: businessId.id},
          data: {name: categoryName}
      })

      return {success:true}
  } catch (error) {
      return { success: false, message: `${error}`};
  }
};


// delete category for service
export const deleteCategory = async (categoryId:string) => {
  try {
      await prisma.categories.delete({
          where: {id: categoryId}
      })

      return {success:true}
  } catch (error) {
      return { success: false, message: error };
  }
};

export type AddNewServiceProps = {
  name: string,
  description: string,
  price: string,
  durationType: string,
  duration: number,
  category: string,
  from: number,
  to: number,
}

// add service for business
export const addNewService = async (serviceData:AddNewServiceProps ) => {
  try {
      const businessId = await businessAuth()

      const addNewService = await prisma.service.create({
          data: {
              serviceId: businessId.id,
              categoryId: serviceData.category,
              name: serviceData.name,
              price: serviceData.price,
              description: serviceData.description,
              durationType: serviceData.durationType,
              duration: serviceData.duration,
              from: serviceData.from,
              to: serviceData.to
          },
      });

      if(!addNewService) return {success:false}
      return {success:true}
  } catch (error) {
      console.log(error)
  }
}


// delete service for business
export const deleteService = async (id:string) => {
  try {
      const deleted = await prisma.service.delete({
          where: {
              id: id
          }
      })

      if(!deleted) return {success:false}
      return {success:true}
  } catch (error) {
      return { success: false, message: error };
  }
};