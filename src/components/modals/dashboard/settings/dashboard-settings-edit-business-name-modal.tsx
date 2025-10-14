'use client'
import { useModalStore, useToastStore } from "@/lib/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import { editBusinessName } from "@/app/dashboard/settings/actions";
import { FormError } from "@/components/forms/form-error";
import { Spinner } from "@/components/spinner";
import { FormLabel } from "@/components/forms/form-label";
import { FormInput } from "@/components/forms/form-input";
import { ExitModalButton } from "../../exit-modal-button";

const businessNameSchema = z.object({businessName: z.string().min(1, ({ message: "Brak nazwy biznesu" })).max(50)})
type BusinessName = z.infer<typeof businessNameSchema>

export const DashboardSettingsEditBusinessNameModal = ({businessName}:{businessName:string}) =>  {
  const queryClient = useQueryClient()
  const closeModal = useModalStore(store => store.closeModal)
  const showToast = useToastStore(store => store.showToast) 

  const {register, handleSubmit, formState} = useForm<BusinessName>({
    resolver: zodResolver(businessNameSchema),
    defaultValues: { businessName: businessName }
  })

  const { mutate: editBusinessNameMutation, isPending:editBusinessNameMutationIsPending } = useMutation({
    mutationFn: async (businessName: string) => {
      const businessNameFormatted = businessName.trim()
      const response = await editBusinessName(businessNameFormatted)
      if(!response.success) {
        showToast(response.message, "error")
        return 
      }
      closeModal()
      showToast(response.message, "success")
      return response.data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["getBusinessInformationForSettings"] })
  })

  const onBusinessNameEditSubmit = (data: BusinessName) => {
    editBusinessNameMutation(data.businessName)
  }
  
  return (
    <div className="w-[360px] flex flex-col px-4 pt-6  pb-4 bg-white ring-1 ring-white inset-shadow-white rounded-4xl">
      <form onSubmit={handleSubmit(onBusinessNameEditSubmit)} className="flex flex-col gap-5">
        <div className="w-full flex flex-col gap-2.5">
          <FormLabel htmlFor="businessName" labelText="Nazwa serwisu"/> 
          <FormInput 
            id="businessName"
            type="text"
            {...register("businessName")}
          />
          <FormError error={formState.errors.businessName?.message}/>
        </div>
        
        <div className="w-full flex flex-row gap-2.5">
          <ExitModalButton/>
          
          <button 
            type="submit"
            className="w-full text-center justify-center py-2.5 bg-[#333] rounded-2xl shadow-bnw-y-small hover:cursor-pointer hover:bg-[#222] active:scale-xs transition duration-75"
          >
            {editBusinessNameMutationIsPending ? <Spinner/> : <p className="text-white">Zapisz</p>} 
          </button>
        </div>
      </form>
    </div>
  )
}