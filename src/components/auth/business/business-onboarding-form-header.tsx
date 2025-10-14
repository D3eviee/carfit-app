const formHeadings = [
  {
    title: "Witamy w CarFit",
    subtitle: "Stwórz konto dla swojego biznesu i pozwól mu rosnąć",
  },
  {
    title: "Jaki rodzaj biznesu prowadzisz?",
    subtitle: "Wybierz kategorię, która najlepiej opisuje rodzaj usług, które dostarczasz."
  },
  {
    title: "Informacje o biznesie",
    subtitle: "Dostarcz informację o właścicielu i biznesie",
  },
  { 
    title: "Adres ", 
    subtitle: "Gdzie znajduje się twój biznes?" 
  },
  { title: "Opis ", 
    subtitle: "Opowiedz nam o swoim biznesie" 
  },
  {
    title: "Czas pracy",
    subtitle: "Daj znać klientom, w jakich dniach pracujesz",
  },
]

export const BusinessOnboardingFormHeader = ({formPage}:{formPage:number}) => {
  return (
    <div className="w-full flex flex-col gap-1 justify-center items-center">
      <p className="text-main-black text-xl font-semibold leading-6">{formHeadings[formPage].title}</p>
      <p className="text-[#555] text-center tracking-tight text-sm">{formHeadings[formPage].subtitle}</p>
    </div>
  )
}

