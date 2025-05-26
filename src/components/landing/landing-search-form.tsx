"use client";
import { MapPinned } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LandingSearchForm() {
  const [location, setLocation] = useState("");
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!location.trim()) return;
    const params = new URLSearchParams();
    params.append("location", location.trim());
    router.push(`/search?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="py-2.5 px-3.5 flex flex-row border border-[#333333] rounded-md gap-[15px]"
    >
      <div className="flex flex-row items-center w-full gap-3">
        <label htmlFor="location" className="sr-only">Location</label>
        <MapPinned strokeWidth={1.5} className="pr-1" />
        <input
          type="text"
          id="location"
          placeholder="Enter location..."
          className="outline-none w-full"
          autoComplete="off"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
        />
      </div>

      <button
        type="submit"
        className="font-semibold text-sm py-2 px-4 rounded-md bg-black text-white hover:bg-[#333333]"
      >
        Szukaj
      </button>
    </form>
  )
}