'use client'
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SupportFormSchema, supportFormSchema } from "@/lib/schema"
import { useToastStore } from "@/lib/store"
import { SupportLabel } from "./SupportLabel"
import { SupportInput, SupportTextarea } from "./SupportInput"
import { FormError } from "../forms/FormError"
import { sendSupportTicket } from "@/actions/support/actions"

const EMPTY_FORM: SupportFormSchema = { name: "", email: "", title: "", content: "" }

const INPUT_FIELDS = [
    { id: "name", label: "Imię", type: "text", autoComplete: "given-name" },
    { id: "email", label: "Email", type: "email", autoComplete: "email" },
    { id: "title", label: "Temat", type: "text", autoComplete: "off" },
] as const

export const SupportForm = () => {
    const showToast = useToastStore((store) => store.showToast)
    
    const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm<SupportFormSchema>({
        resolver: zodResolver(supportFormSchema),
        defaultValues: EMPTY_FORM
    })
    
    const [name, email, title, content] = watch(["name", "email", "title", "content"])
    const isDisabled = isSubmitting || !(name && email && title && content)
    
    const onSubmit: SubmitHandler<SupportFormSchema> = async (data) => {
        try {
            const response = await sendSupportTicket(data)
            if (!response.success) {
                showToast(response.message, "error")
                return
            }
            showToast(response.message, "success")
            reset(EMPTY_FORM)
        } catch {
            showToast("Nie udało się wysłać zgłoszenia. Sprawdź połączenie i spróbuj ponownie", "error")
        }
    }
    
    return (
        <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-10 sm:w-[380px] lg:w-[450px] sm:px-8 sm:ring-[0.5px] sm:ring-[#D4D4D4] sm:py-8 sm:rounded-3xl sm:shadow-lg"
        >
            <div className="w-full flex flex-col gap-6">
                {INPUT_FIELDS.map((field) => {
                    const error = errors[field.id]?.message
                    const errorId = `${field.id}-error`

                    return (
                        <div key={field.id} className="flex flex-col gap-2.5">
                            <SupportLabel htmlFor={field.id} labelText={field.label} />
                            <SupportInput
                                id={field.id}
                                type={field.type}
                                autoComplete={field.autoComplete}
                                aria-invalid={!!error}
                                aria-describedby={error ? errorId : undefined}
                                {...register(field.id)}
                            />
                            <FormError id={errorId} error={error} />
                        </div>
                        )
                })}
            
                <div className="flex flex-col gap-2.5">
                    <SupportLabel htmlFor="content" labelText="Opis" />
                    <SupportTextarea
                        id="content"
                        rows={5}
                        aria-invalid={!!errors.content}
                        aria-describedby={errors.content ? "content-error" : undefined}
                        {...register("content")}
                    />
                    <FormError id="content-error" error={errors.content?.message} />
                </div>
            </div>
        
            <button
                type="submit"
                disabled={isDisabled}
                className="w-full text-center font-semibold text-sm py-3 rounded-xl bg-[#242426] shadow-md text-white hover:cursor-pointer hover:bg-[#333333] disabled:bg-[#E0E0E2] disabled:cursor-not-allowed active:scale-105"
            >
                {isSubmitting ? "Wysyłanie…" : "Wyślij"}
            </button>
        </form>
    )
}