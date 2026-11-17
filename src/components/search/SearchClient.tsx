"use client"
import { useSearchParams } from "next/navigation";
import SearchResultGrid from "@/components/search/SearchResultGrid";
import { Error as ErrorState } from "@/components/error";
import { Spinner } from "@/components/spinner";
import { cn } from "@/utils";
import { useSearchResults } from "@/lib/hooks/client/search/useSearchResults";

export const SearchClient = () => {
  const searchParams = useSearchParams()
  const location = searchParams.get("location")?.trim() ?? ""
  const category = searchParams.get("category")?.trim() ?? ""

  const { data, isPending, isError, isPlaceholderData } = useSearchResults(location, category)

  const subtitle = [location, category].filter(Boolean).join(" – ") || "Wszystkie lokalizacje"

  return (
    <div className="flex w-full flex-col gap-8 px-4 md:px-12 xl:px-40 2xl:px-60">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-[#191919]">Dostępne serwisy</h1>
        <p className="text-base font-light text-[#363638]">{subtitle}</p>
      </div>

      {isPending ? (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      ) : isError ? (
        <ErrorState />
      ) : data.length === 0 ? (
        <p className="py-20 text-center text-base text-[#8A8A8A]">Brak wyników</p>
      ) : (
        <div
          aria-busy={isPlaceholderData}
          className={cn("transition-opacity", isPlaceholderData && "opacity-60")}
        >
          <SearchResultGrid data={data} />
        </div>
      )}
    </div>
  )
}