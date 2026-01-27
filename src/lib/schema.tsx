import z from 'zod'

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

export const clientOnboardingData = z.object({
  name: z
    .string()
    .min(1, "Wprowadź imię i nazwisko"),
  email: z
    .string()
    .min(1, "Wprowadź adres e-mail")
    .email({message: "Nieprawidłowy adres email"}),
  password: z
    .string()
    .min(8, "Hasło musi mieć co najmniej 8 znaków")
    .regex(/[A-Z]/, "Hasło musi zawierać co najmniej jedną wielką literę")
    .regex(/\d/, "Hasło musi zawierać co najmniej jedną cyfrę"),
  phone: z
    .string()
    .transform((val) => val.replace(/\s/g, ''))
    .refine((val) => /^\d{9}$/.test(val), { message: "Numer telefonu musi składać się z 9 cyfr",})
})

export type ClientOnboardingData = z.infer<typeof clientOnboardingData>

export const loginDataSchema = z.object({
  email: z
    .string()
    .min(1, "Wprowadź adres e-mail")
    .email({message: "Nieprawidłowy format adresu email"}),
  password: z
    .string()
    .min(8, "Hasło musi mieć co najmniej 8 znaków")
})

export type LoginDataSchema = z.infer<typeof loginDataSchema>

export const businessOnboardingSchema = z.object({
  email: z
    .string()
    .min(1, "Wprowadź adres e-mail")
    .max(50, "Wprowadź adres e-mail jest za długi")
    .email({message: "Nieprawidłowy format adresu email"}),
  password: z
    .string()
    .min(8, "Hasło musi mieć co najmniej 8 znaków")
    .regex(/[A-Z]/, "Hasło musi zawierać co najmniej jedną wielką literę")
    .regex(/\d/, "Hasło musi zawierać co najmniej jedną cyfrę"),
  repeatedPassword: z
    .string()
    .min(8, ({ message: "Hasło jest za krótkie" })),
  businessCategory: z
    .string({ message: "Kategoria nie została wybrana" }),
  businessName: z
    .string()
    .min(1, ({ message: "Brak nazwy biznesu" }))
    .max(50),
  businessOwner: z
    .string()
    .min(1, ({ message: "Podaj imię i nazwisko"}))
    .max(40),
  businessPhone: z
    .string()
    .transform((val) => val.replace(/\s/g, ''))
    .refine((val) => /^\d{9}$/.test(val), { message: "Numer telefonu musi składać się z 9 cyfr"}),
  businessTown: z
    .string()
    .min(1, { message: "Nie podano miasta" } ),
  businessZipcode: z
    .string()
    .regex(/^\d{2}-\d{3}$/, { message: "Nieprawidłowy format kodu pocztowego" }),
  businessDistrict: z
    .string()
    .min(1, { message: "Nie podano dzielnicy" } ),
  businessStreet: z
    .string()
    .min(1, { message: "Nie podano adresu" } ),
  businessDescription: z
    .string()
    .min(1, {message: "Powiedz nam coś o sobie. Pole nie może być puste"})
    .max(400, {message: "Osiągnięto maksymalną ilość znaków"})
})
  
// policyAcceptance: boolean(({ message: "Policy and privacy rules not accepted" }),),

export type BusinessOnboardingSchema = z.infer<typeof businessOnboardingSchema>

export const businessOnboardingEmailSchema = businessOnboardingSchema.pick({
  email: true,
  password: true,
  repeatedPassword: true
}).refine(
  (d) => d.password === d.repeatedPassword,
  { path: ["repeatedPassword"], message: "Hasła muszą być identyczne" }
)

export type BusinessOnboardingEmailSchema = z.infer<typeof businessOnboardingEmailSchema>

//DASHBOARD
// schema for changing personal information on dashboard profile page
export const dashboardProfileEditPersonalData = z
  .object({
    owner: z
      .string()
      .min(1, "Wprowadź imię i nazwisko"),
    email: z
      .string()
      .min(1, "Wprowadź adres e-mail")
      .email({message: "Nieprawidłowy adres email"}),
    phone: z
      .string()
      .transform((val) => val.replace(/\s/g, ''))
      .refine((val) => /^\d{9}$/.test(val), { message: "Numer telefonu musi składać się z 9 cyfr",})
  })
export type DashboardProfileEditPersonalData= z.infer<typeof dashboardProfileEditPersonalData>

// schema for changing password
export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Wprowadź obecne hasło"),
    newPassword: z
      .string()
      .min(8, "Hasło musi mieć co najmniej 8 znaków")
      .regex(/[A-Z]/, "Hasło musi zawierać co najmniej jedną wielką literę")
      .regex(/\d/, "Hasło musi zawierać co najmniej jedną cyfrę"),
    repeatNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.repeatNewPassword, {
    message: "Hasła muszą się zgadzać",
    path: ["repeatNewPassword"],
  })
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>

// schema for adding service
export const addServiceSchema = z.object({
    name: z
      .string()
      .min(1,  {message:"Podaj nazwę usługi"}),
    categoryId: z
      .string()
      .min(1,  {message:"Przyspisz usługę do kategorii"}),
    price: z
      .string()
      .min(1, {message:"Podaj cenę usługi"}),
    description: z
      .string()
      .min(1, {message:"Opisz usługę"}),
    duration: z
      .number()  
})


export type AddService = z.infer<typeof addServiceSchema>

// CLIENT PROFILE SCHEMAS
// SCHEMA FOR CHANGING CLIENT DATA ON PERSONAL PAGE
export const changeClientProfileData = z.object({
  name: z
    .string()
    .min(1, "Wprowadź imię i nazwisko"),
  email: z
    .string()
    .min(1, "Wprowadź adres e-mail")
    .email({message: "Nieprawidłowy adres email"}),
  phone: z
    .string()
    .transform((val) => val.replace(/\s/g, ''))
    .refine((val) => /^\d{9}$/.test(val), { message: "Numer telefonu musi składać się z 9 cyfr",})
})
export type ChangeClientProfileData = z.infer<typeof changeClientProfileData> 



//DASHBOARD
export const categoryNameSchema = z.object({
  categoryName: z
  .string()
  .min(1, {message: "Podaj nazwę kategorii"})
  .max(30, {message: "Przekroczono dopuszczają liczbę zanków"})
})
export type CategoryName = z.infer<typeof categoryNameSchema> 

// schema for adding service
export const addNewAppointmentManualSchema = z.object({
  category: z
    .string()
    .min(1,  {message:"Wybierz kategorię usługi"}),
  service: z
    .string()
    .min(1,  {message:"Wybierz usługę"}),
  date: z
    .string(),
  time: z
    .string(),
  clientName: z
    .string()
    .min(1,  {message:"Podaj imię i nazwisko klient"}),
  clientPhone: z
    .string()
    .transform((val) => val.replace(/\s/g, ''))
    .refine((val) => /^\d{9}$/.test(val), { message: "Numer telefonu musi składać się z 9 cyfr"}),
  clientCar: z
    .string()
    .min(1,  {message:"Podaj informacje o pojeździe"}),
  description: z.string()
})
export type AddNewAppointmentManual = z.infer<typeof addNewAppointmentManualSchema>


// DASHBOARD -> SETTINGS
export const locationSettingsSchema = z.object({
  town: z
    .string()
    .min(1, { message: "Nie podano miasta" } ),
  zipcode: z
    .string()
    .regex(/^\d{2}-\d{3}$/, { message: "Nieprawidłowy format kodu pocztowego" }),
  district: z
    .string()
    .min(1, { message: "Nie podano dzielnicy" } ),
  street: z
    .string()
    .min(1, { message: "Nie podano adresu" } ),
})
export type LocationSettings = z.infer<typeof locationSettingsSchema>

// DASHBOARD -> SETTINGS
export const businessSocialLinksSchema = z.object({
  facebookUrl: z.string().trim().optional().refine(
    val => !val || z.string().url().safeParse(val).success,
    { message: "Podaj poprawny adres URL lub zostaw puste" }
  ),
  instagramUrl: z.string().trim().optional().refine(
    val => !val || z.string().url().safeParse(val).success,
    { message: "Podaj poprawny adres URL lub zostaw puste" }
  ),
  websiteUrl: z.string().trim().optional().refine(
    val => !val || z.string().url().safeParse(val).success,
    { message: "Podaj poprawny adres URL lub zostaw puste" }
  ),
})
export type BusinessSocialLinks = z.infer<typeof businessSocialLinksSchema>

// schema for adding service
export const addNewCarSchema = z.object({
  brand: z
    .string()
    .min(1,  {message:"Podaj markę pojazdu"}),
  model: z
    .string()
    .min(1,  {message:"Podaj model"}),
  year: z
    .string()
    .regex(/^\d{4}$/, "Data musi zawierać dokładnie 4 cyfry")
})

export type AddNewCar = z.infer<typeof addNewCarSchema>