'use server'
import { SupportFormSchema } from '@/lib/schema';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendSupportTicket(data:SupportFormSchema ) {
  const {name, email, title, content} = data
  
  const html = `
    <h1>Nowe zgłoszenie od ${name}</h1>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Tytuł:</strong> ${title}</p>
    <p><strong>Treść:</strong><br/>${content}</p>
  `

  try {
    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["hipolitroszkowski@protonmail.ch"],
      subject: `Support ticket from ${name}`,
      html
    }) 
    
    if (error) return { success: false, message: "Wystąpił problem z wysyłaniem zgłoszenia. Spróbuj ponownie" }
    return { success: true, message: "Dziękujemy za zgłosznie. Odpowiemy jak najszybciej." }
  }catch (error) {
    return { success: false, message: "Wystąpił problem z serwerem. Spróbuj później" + error }
  }
}