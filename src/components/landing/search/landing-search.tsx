"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import LandingSearchLocation from "./location/landing-search-location";
import LandingSearchCategory from "./category/landing-search-category";

export default function LandingSearchForm() {
  const router = useRouter()
  const [category, setCategory] = useState("")
  const [location, setLocation] = useState("");

   const handleSubmit = () => {
    const params = new URLSearchParams();

    if (location.trim()) {
      params.append('location', location);
    }

    if (category.trim()) {
      params.append('category', category);
    }

    const queryString = params.toString()
    const url = `/search?${queryString}`;
    router.push(url);
  };

  return (
    <form className="flex flex-col p-4 bg-[#F2F2F7] border-[0.5px] rounded-3xl gap-3 md:flex-row md:rounded-2xl md:px-3 md:py-2">
      <div className="w-full flex flex-col gap-3 sm:flex-row">
        <LandingSearchCategory
        categoryState={category}
        setCategoryState={setCategory}
        />
        <LandingSearchLocation
          locationState={location}
          setLocationState={setLocation}
        />
      </div>

      <button
        type="button" 
        onClick={handleSubmit}
        className="w-full font-medium text-base px-6 py-3 rounded-xl bg-gradient-to-b from-[#313131] to-[#141414] shadow-md text-white hover:bg-[#333333] md:w-fit md:rounded-xl md:px-9"
      >
        Szukaj
      </button>
    </form>
  )
}