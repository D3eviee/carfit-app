import z, { boolean, string } from 'zod'


// CLIENT LOGIN FORM SCHEMA
export const clientLoginSchema = z.object({
  email: z
        .string()
        .email(({ message: "Niepoprawny format" }))
        .min(1)
        .max(40),
    password: z
        .string()
        .min(8, ({ message: "Hasło jest za krótkie" })),
})
export type ClientLoginSchema = z.infer<typeof clientLoginSchema>


/// CLIENT ONBOARDING FORM SCHEMA
export const clientOnboardingSchema = z.object({
  fullname: z.
  string().
  min(1, ({message: "Podane dane są nieodpowiednie"})),

  email: z
    .string()
    .email(({ message: "Niepoprawny format" }))
    .min(1)
    .max(40),
  password: z
    .string()
    .min(8, ({ message: "Hasło jest za krótkie" })),
  phone: z
  .string()
  .regex(/^\d{9}$/, "Numer telefonu musi składać się z 9 cyfr")
})
export type ClientOnboardingSchema = z.infer<typeof clientOnboardingSchema>


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

export const addCategorySchema = z.object({
    categoryName: z.string().min(1, {message: "Podaj nazwę"})
})

export type AddCategorySchema = z.infer<typeof addCategorySchema>

export const addServiceSchema = z.object({
    name: z.string().min(1),
    category: z.string().min(1),
    price: z.string().min(1),
    description: z.string().min(1),
    duration: z.number(),    
})

export type AddServiceSchema = z.infer<typeof addServiceSchema>;


// schema for changing password on profile page
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Wprowadź obecne hasło"),
    newPassword: z.string().min(8, "Hasło musi mieć co najmniej 8 znaków"),
    repeatNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.repeatNewPassword, {
    message: "Hasła muszą się zgadzać",
    path: ["repeatNewPassword"],
  })
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>


// schema for changing personal information on profile page
export const changePersonalDataSchema = z
  .object({
    name: z.string().min(1, "Wprowadź imię i nazwisko"),
    email: z.string().min(1, "Wprowadź adres e-mail").email({message: "Nieprawidłowy adres email"}),
    phone: z.string().regex(/^\d{9}$/, "Numer telefonu musi składać się z 9 cyfr")
  })
export type ChangePersonalDataInput= z.infer<typeof changePersonalDataSchema>