import z, { boolean, string } from 'zod'

export const businessOnboardingSchema = z.object({
    email: z
        .string()
        .email(({ message: "Niepoprawny format" }))
        .min(1)
        .max(40),
    password: z
        .string()
        .min(8, ({ message: "Hasło jest za krótkie" })),
    businessCategory: z
        .string(({ message: "Kategoria nie została wybrana" }),),
    businessName: z
        .string()
        .min(1, ({ message: "Brak nazwy biznesu" }))
        .max(50),
    businessOwner: z
        .string(({ message: "Podaj informację" }))
        .min(1, ({ message: "Podaj informację"}))
        .max(40),
    businessPhone: z
        .string()
        .length(9, ({ message: "Nieprawidłowy numer" }),),
    
    policyAcceptance: boolean(({ message: "Policy and privacy rules not accepted" }),),

    businessTown: string().min(1, { message: "Town for business was not provided" }),
    businessZipcode: string().min(1, { message: "Zipcode for business was not provided" }),
    businessDistrict: string().min(1, { message: "District for business was not provided" }),
    businessStreet: string().min(1, { message: "Street for business was not provided" } ),
    businessDescription: string().min(1, {message: "Powiedz nam coś o sobie"})
})

export type BusinessOnboardingSchema = z.infer<typeof businessOnboardingSchema>

export const categoryName = z.string().min(1)

export const newServiceSchema = z.object({
    name : z.string().min(1, "Service name needs to be provided").max(120),
    category: z.string().nonempty(),
    price: z.string().nonempty("Provide value"),
    description: z.string().max(400),
    durationType: z.string().nonempty("Provide value"),
    from: z.number(),
    to:  z.number(),
    duration: z.number(),
})

export const supportFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Podaj imię")
    .max(120, "Imię może mieć maksymalnie 120 znaków"),
  email: z
    .string()
    .min(1, "Podaj email")
    .max(50, "Email może mieć maksymalnie 50 znaków")
    .email({ message: "Niepoprawny format adresu email" })
    .toLowerCase(),
  title: z
    .string()
    .min(1, "Podaj tytuł zgłoszenia")
    .max(100, "Tytuł może mieć maksymalnie 100 znaków"),
  content: z
    .string()
    .trim()
    .min(10, "Opisz dokładnie, czego dotyczy zgłoszenie")
    .max(1000, "Opis może mieć maksymalnie 1000 znaków"),
});

export type SupportFormSchema = z.infer<typeof supportFormSchema>;
