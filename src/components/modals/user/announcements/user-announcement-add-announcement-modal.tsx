'use client'
import { FormError } from "@/components/forms/form-error";
import { useModalStore } from "@/lib/store";
import { useForm } from "react-hook-form";
import { SERVICES_CATEGORIES } from '@/lib/data'; 
import { Spinner } from "@/components/spinner";
import { Error } from "@/components/error";
import { Announcement } from "@/lib/types";
import { useClientCars } from "@/lib/hooks/client/useClientCars";
import { UserAnnouncementModalLabel } from "./user-announcement-modal-label";
import { UserAnnouncementModalInput } from "./user-announcement-modal-input.";
import TextareaAutosize from "react-textarea-autosize"
import { ExitModalButton } from "../../exit-modal-button";
import { useAddAnnouncement } from "@/lib/hooks/client/useAddAnnouncement";

export const UserAnnouncementAddAnnouncementModal = () => {
  const closeModal = useModalStore(store => store.closeModal)
  const {register, formState, handleSubmit} = useForm<Announcement>({
    defaultValues: {
      title: "",
      category: "",
      description: "",
      carId: "",
      town: "",
      district: ""
    }
  })

  const {mutate, isPending} = useAddAnnouncement()
  const handleAddingAnnouncment = (data:Announcement) => mutate(data)

  const {data:cars, status } = useClientCars()
  if(status == "pending") return <Spinner/>
  if(status == "error") return <Error/>

  return (
    <div className="flex flex-col px-6 py-6 bg-white backdrop-blur-[3px] ring-1 ring-white inset-shadow-white rounded-4xl w-3xl  space-y-5">
      <h1 className="w-full text-main-black text-center text-sm font-medium py-2">Nowe ogłoszenie</h1>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit(handleAddingAnnouncment)}>
        <div className="flex flex-col gap-2.5">
          <UserAnnouncementModalLabel htmlFor="title" labelText="Temat"/>
          <UserAnnouncementModalInput type="text" id="title" register={register("title")}  placeholder="Np. wymiana opony"/>
          <FormError error={formState.errors.title?.message}/>
        </div>

        <div className="w-full flex flex-row gap-6">
          <div className="w-full flex flex-col gap-2.5">
            <UserAnnouncementModalLabel htmlFor="category" labelText="Kategoria"/>
            <select
              {...register("category")}
              className="w-full bg-[#F6F7FB] px-2 py-1.5 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
            >
              { SERVICES_CATEGORIES.map((category) => 
                  <option 
                    key={category.name}
                    className="w-full bg-[#F6F7FB] px-2 py-1.5 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
                    value={category.name}
                  >
                    {category.name}
                  </option>
                )
              }
            </select>
            <FormError error={formState.errors.category?.message}/>
          </div>

          <div className="w-full flex flex-col gap-2.5">
            <UserAnnouncementModalLabel htmlFor="car" labelText="Samochód"/>
            <select
              {...register("carId")}
              className="w-full bg-[#F6F7FB] px-2 py-1.5 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
            >
              { cars.map((car) => 
                <option 
                  key={car.id}
                  className="w-full bg-[#F6F7FB] px-2 py-1.5 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
                  value={car.id}
                >
                  {`${car.brand} - ${car.model} - ${car.year}`}
                </option>
              )}
            </select>
            <FormError error={formState.errors.category?.message}/>
          </div>
        </div>

        <div className="w-full flex flex-row gap-6">
          <div className="w-full flex flex-col gap-2.5">
            <UserAnnouncementModalLabel htmlFor="town" labelText="Miasto"/>
            <UserAnnouncementModalInput type="text" id="town" register={register("town")} />
            <FormError error={formState.errors.town?.message}/>
          </div>

          <div className="w-full flex flex-col gap-2.5">
            <UserAnnouncementModalLabel htmlFor="district" labelText="Dzielnica"/>
            <UserAnnouncementModalInput type="text" id="district" register={register("district")} />
            <FormError error={formState.errors.district?.message}/>
          </div>
        </div>

        <div className="w-full flex flex-col gap-2.5">
          <UserAnnouncementModalLabel htmlFor="description" labelText="Opis"/>
          <TextareaAutosize
            minRows={1}
            maxRows={6}
            placeholder="Opisz jakiej usługi potrzebujesz"
            {...register("description")}
            className="w-full bg-[#F6F7FB] text-main-black leading-6 text-sm font-normal resize-none hover:cursor-pointer px-2 py-2.5 rounded-xl border outline-none border-transparent focus:border-[#D4D4D4]"
          />
          <FormError error={formState.errors.description?.message}/>
        </div>

        <div className="w-full flex flex-row gap-8">
          <ExitModalButton exitFn={closeModal}/>
          <button 
            type="submit" 
            className="w-full text-center justify-center py-2.5 bg-main-black rounded-2xl shadow-bnw-y-small hover:cursor-pointer hover:bg-[#222] active:scale-xs transition duration-75"
          >
           {isPending ? <Spinner color="#FFF"/> :  <p className="text-white">Dodaj ogłoszenie</p>}
          </button>      
        </div>      
      </form>
    </div>
  )
}