export const ServiceLocation = ({locationData}:{locationData : {street: string, city: string, zipcode:string }}) => {
  const apiKey = process.env.GOOGLE_MAPS_KEY
  const rawLocation = `ul. ${locationData.street}, ${locationData.zipcode} ${locationData.city}`
  const encodedLocation = encodeURIComponent(rawLocation)
  const src = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedLocation}`

  return (
    <div className="flex flex-col gap-3">
      <p className="relative text-lg text-[#3A3A3A] font-semibold leading-none">Lokalizacja</p>
      <div className="w-full h-56 border rounded-lg overflow-clip shadow-sm ring-1 ring-[#F6F7FB] md:h-72 lg:h-96">
        <iframe
        width="100%"
        height="100%"
        src={src}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      </div>
    </div>
  )
}
