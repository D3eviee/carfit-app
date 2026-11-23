'use server'
import { Resend } from "resend"
import { supportFormSchema, SupportFormSchema } from "@/lib/schema"

const resend = new Resend(process.env.RESEND_API_KEY);

const SUPPORT_INBOX = "support@car-fit.pl"
// Must be an address on a domain verified in Resend (e.g. "CarFit <no-reply@car-fit.pl>")
const FROM_ADDRESS = process.env.SUPPORT_FROM_EMAIL ?? "onboarding@resend.dev"

type SupportTicketResult = { success: boolean; message: string }

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!
  )

const singleLine = (value: string) => value.replace(/\s+/g, " ").trim()

export async function sendSupportTicket(input: unknown): Promise<SupportTicketResult> {
  // Never trust the browser – validate again on the server
  const parsed = supportFormSchema.safeParse(input)
  if (!parsed.success) 
    return { success: false, message: "Sprawdź poprawność danych w formularzu" }
  

  const { name, email, title, content } = parsed.data

  const html = `
    <h1>Nowe zgłoszenie od ${escapeHtml(name)}</h1>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Tytuł:</strong> ${escapeHtml(title)}</p>
    <p><strong>Treść:</strong><br/>${escapeHtml(content).replace(/\n/g, "<br/>")}</p>
  `

  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [SUPPORT_INBOX],
      replyTo: email,
      subject: `Wsparcie – zgłoszenie od ${singleLine(name)}: ${singleLine(title)}`,
      html,
    })

    if (error) {
      console.error("sendSupportTicket – Resend error:", error)
      return { success: false, message: "Wystąpił problem z wysyłaniem zgłoszenia. Spróbuj ponownie" }
    }

    return { success: true, message: "Dziękujemy za zgłoszenie. Odpowiemy najszybciej, jak to możliwe" }
  } catch (error) {
    console.error("sendSupportTicket failed:", error)
    return { success: false, message: "Wystąpił problem z serwerem. Spróbuj później" }
  }
}