'use client'
import { FormError } from "@/components/forms/form-error";
import { Spinner } from "@/components/spinner";
import { useAddServiceCategory } from "@/lib/hooks/dashboard/useAddServiceCategory";
import { CategoryName, categoryNameSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ExitModalButton } from "../../exit-modal-button";
import { FormLabel } from "@/components/forms/form-label";
import { FormInput } from "@/components/forms/form-input";

export const DasboardServicesAddCategoryModal = () =>  {
  const { register, handleSubmit, formState } = useForm<CategoryName>({
    resolver: zodResolver(categoryNameSchema),
    defaultValues: { categoryName: "" }
  })
  
  const { mutate: addCategory, isPending } = useAddServiceCategory()
  const onSubmit = (data: CategoryName) => addCategory(data.categoryName)
  
  return (
    <div className="w-[360px] flex flex-col gap-8 px-4 pt-8 pb-4 bg-[#FFF] rounded-4xl text-black space-y-5">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="w-full flex flex-col gap-2.5">
            <FormLabel htmlFor="categoryName" labelText="Nazwa kategorii"/> 
            <FormInput
                id="categoryName"
                type="text"
                {...register("categoryName")}
            />
            <FormError error={formState.errors.categoryName?.message}/>
            </div>
        
        <div className="w-full flex flex-row gap-2.5">
            <ExitModalButton />
          
          <button 
            type="submit"
            className="w-full text-center justify-center py-2.5 bg-main-black rounded-2xl shadow-bnw-y-small hover:cursor-pointer hover:bg-[#222] active:scale-105"
          >
           {isPending ? <Spinner/> : <p className="text-[#FFF]">Dodaj</p>} 
          </button>
        </div>
      </form>
    </div>
  )
}