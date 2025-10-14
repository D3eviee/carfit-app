'use client'
import { CategoryName, categoryNameSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormError } from "../../../forms/form-error";
import { Spinner } from "../../../spinner";
import { ExitModalButton } from "../../exit-modal-button";
import { useEditServiceCategory } from "@/lib/hooks/dashboard/useEditServiceCategory";;
import { FormLabel } from "@/components/forms/form-label";
import { FormInput } from "@/components/forms/form-input";

type DashboardServiecsEditCategoryModalProps = {
  categoryId: string
  categoryName: string
}

export const DashboardServiecsEditCategoryModal = ({categoryId, categoryName}:DashboardServiecsEditCategoryModalProps) =>  {
  const {register, handleSubmit, formState} = useForm<CategoryName>({
    resolver: zodResolver(categoryNameSchema),
    defaultValues: { categoryName: categoryName }
  })

  const {mutate, isPending} = useEditServiceCategory(categoryId)
  const onSubmit = (data: CategoryName) => mutate(data.categoryName)

  return (
    <div className="w-[360px] flex flex-col gap-8 px-4 pt-8 pb-4 bg-[#FFF] rounded-4xl text-black space-y-5">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="w-full flex flex-col gap-1">
          <FormLabel htmlFor="categoryName" labelText="Nazwa kategorii"/> 
          <FormInput 
            id="categoryName"
            type="text"
            {...register("categoryName")}
          />
          <FormError error={formState.errors.categoryName?.message}/>
        </div>
        
        <div className="w-full flex flex-row gap-2.5">
            <ExitModalButton/>
          
          <button 
            type="submit"
            className="w-full text-center justify-center py-2.5 bg-main-black rounded-2xl shadow-bnw-y-small hover:cursor-pointer hover:bg-[#222] active:scale-105"
          >
           {isPending ? <Spinner/> : <p className="text-[#FFF]">Zapisz</p>} 
          </button>
        </div>
      </form>
    </div>
  )
}