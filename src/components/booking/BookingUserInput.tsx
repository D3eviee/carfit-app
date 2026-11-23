"use client"
import { useClientCars } from "@/lib/hooks/client/cars/useClientCars"
import { useAppointmentStore } from "@/lib/store"
import { Spinner } from "../spinner"

type Car = { id: string; brand: string; model: string; year: string | number }
const carLabel = (car: Car) => `${car.brand} - ${car.model} - ${car.year}`

export const BookingUserInput = () => {
  // Appointment store
  const clientMessage = useAppointmentStore((store) => store.clientMessage)
  const setClientMessage = useAppointmentStore((store) => store.setClientMessage)
  const clientCar = useAppointmentStore((store) => store.clientCar)
  const setClientCar = useAppointmentStore((store) => store.setClientCar)

  const { data, status } = useClientCars()
  if (status === "pending") return <Spinner color="#000" />

  // Guest users (or a failed request) simply get no car list – the description still works
  const cars: Car[] = status === "success" && data ? data : []
  const selectedCarId = cars.find((car) => carLabel(car) === clientCar)?.id ?? ""

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-main-black text-2xl leading-none font-semibold">Dodatkowe informacje</h1>
        <p className="text-main-black text-sm font-light">
          Możesz przekazać nam szczegóły na temat pojazdu, który ma zostać poddany usłudze oraz opisać problem z którym się zmagasz.
        </p>
      </div>
      
       <div className="w-full flex flex-col gap-10">
        {cars.length > 0 && (
          <div className="w-full flex flex-col gap-2.5">
            <label htmlFor="car" className="text-main-black text-sm pl-1.5 font-medium leading-none">Pojazd</label>
            <select
              id="car"
              name="car"
              value={selectedCarId}
              onChange={(e) => {
                const car = cars.find((c) => c.id === e.target.value)
                setClientCar(car ? carLabel(car) : "")
              }}
              className="w-full bg-[#F6F7FB] px-2 py-3 text-middle text-main-black rounded-2xl outline-none border-[0.5px] border-[#D4D4D4] focus:border-[#CCC]"
            >
              <option value="" disabled>Wybierz pojazd</option>
              {cars.map((car) => <option key={car.id} value={car.id} className="bg-[#F6F7FB] text-[#191919]">{carLabel(car)} </option> )}
            </select>
          </div>
        )}

        <div className="w-full flex flex-col gap-2.5">
          {cars.length > 0 && <label htmlFor="client-message" className="text-main-black text-sm pl-1.5 font-medium leading-none">Opis</label> }
          <textarea
            id="client-message"
            value={clientMessage}
            onChange={(e) => setClientMessage(e.target.value)}
            maxLength={1000}
            rows={10}
            className="w-full bg-[#F6F7FB] text-[#191919] rounded-2xl p-3 text-middle resize-none border-[0.5px] border-[#D4D4D4] shadow-sm focus:outline-none"
          />
        </div>
      </div>
    </div>
  )
}