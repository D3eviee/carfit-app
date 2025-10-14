'use client'
import { useClientCars } from "@/lib/hooks/client/useClientCars";
import { useAppointmentStore } from "@/lib/store"
import { useRef } from "react"
import { Spinner } from "../spinner";
import { Error } from "../error";

export const BookingDetailsFromUser = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const setAppointmentUserDetails = useAppointmentStore((store) => store.setClientMessage)
  const clientMessage = useAppointmentStore((store) => store.clientMessage)
  const setClientCar = useAppointmentStore((store) => store.setClientCar)

  const {data:cars, status} = useClientCars()
  if(status == "pending") return <Spinner color="#000"/>
  if(status == "error") return <Error/>

  const handleOnBlur = () => { if (textareaRef.current) setAppointmentUserDetails(textareaRef.current.value)}
  
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full  flex flex-col gap-2">
        <h1 className="text-main-black text-2xl leading-none font-semibold">Dodatkowe informacje</h1>
        <p className="text-main-black text-sm font-light">Możesz przekazać nam szczegóły na temat pojazdu, który ma zostać poddany usłudze oraz opisać problem z którym się zmagasz.</p>
      </div>
      
       <div className="w-full flex flex-col gap-10">
        {cars.length > 0 &&
          <div className="w-full flex flex-col gap-2.5">
            <label htmlFor="car" className="text-main-black text-sm pl-1.5 font-medium leading-none">Pojazd</label>
            <select
              id="car"
              name="car"
              defaultValue=""
              onChange={(e) => { 
                const selectedCar = cars.find(car => car.id === e.target.value);
                if (selectedCar) setClientCar(`${selectedCar.brand} - ${selectedCar.model} - ${selectedCar.year}`)
              }}
              className="w-full bg-[#F6F7FB] px-2 py-3 text-middle text-main-black rounded-2xl outline-none border-[0.5px] border-[#D4D4D4] focus:border-[#CCC]"
            >
              <option value="" disabled> Wybierz pojazd </option>
              {cars.map((car) => 
                <option key={car.id} value={car.id} className="bg-[#F6F7FB] text-[#191919]">
                  {`${car.brand} - ${car.model} - ${car.year}`}
                </option>
              )}
            </select>
          </div>
        }

        <div className="w-full flex flex-col gap-2.5">
          {cars.length > 0 && <label htmlFor="car" className="text-main-black text-sm pl-1.5 font-medium leading-none">Opis</label>}
          <textarea
            defaultValue={clientMessage} 
            ref={textareaRef}
            className="w-full bg-[#F6F7FB] text-[#191919] rounded-2xl p-3 text-middle resize-none border-[0.5px] border-[#D4D4D4] shadow-sm focus:outline-none"
            rows={10}
            onBlur={handleOnBlur}
          ></textarea>
        </div>
      </div>
    </div>
  )
}
 