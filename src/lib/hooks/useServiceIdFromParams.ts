import { useParams } from "next/navigation";

const UUID_LENGTH = 36

// Reads the business UUID from /service/<slug>-<uuid>
export function useServiceIdFromParams(): string {
  const params = useParams<{ business?: string | string[] }>()
  const business = params.business

  if (Array.isArray(business)) return business[business.length - 1] ?? ""
  if (business) return business.slice(-UUID_LENGTH)
  return ""
}