'use client'
import { AddVehicleButton } from "@/components/buttons/add-vehicle-button"
import { UserProfileContainerWrapper } from "./user-profile-container-wrapper"
import { UserProfileCarsItem } from "./user-profile-cars-item"

type UserProfileCarsProps = {
    userCars: {
        model: string;
        id: string;
        brand: string;
        year: number;               
    }[]
}

export const UserProfileCars = ({userCars}:UserProfileCarsProps) => {
  return (
    <UserProfileContainerWrapper>
      <div className="w-full flex flex-col gap-6">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-main-black font-medium text-xl">Twoje pojazdy</h1>
          <AddVehicleButton/> 
        </div>
        
        {userCars.length == 0 &&  <p className="text-sm text-main-black font-light text-center pt-6"> Brak pojazdów </p>}
        
        <div className="w-full flex flex-col gap-4"> 
          {userCars.map((car) => <UserProfileCarsItem  key={car.id} car={car}/> )}
        </div>
      </div>
    </UserProfileContainerWrapper>
  )
}