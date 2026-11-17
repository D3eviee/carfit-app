import { format } from "date-fns";

export const ArticleThumbnail = ({article}) => {
    const { id, image, createdAt, title, layout } = article

    function formatDate(date: Date){
        const day = format(date, "d")
        const month = format(date, "MMM")
        const year = format(date, "y")
        const fullDate = `${day} ${month} ${year}`
        return fullDate
    }

  return (
    <a 
        className="bg-white h-full flex flex-col rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:cursor-pointer group"
        href={`/blog/${id}`}
    >  
        <div className="relative w-full aspect-[16/10] h-64 overflow-hidden">
            <img
                src={image}
                alt={image}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
        </div>
    
        <div className="w-full flex flex-col p-5">
            <p className="text-xs w-fit px-2 py-0.5 rounded-lg bg-[#333] text-white">{layout.toUpperCase()}</p>
            <h3 className="text-[#1D1D1F] min-h-30 max-h-30 md:min-h-40 md:max-h-40 text-xl font-semibold line-clamp-4 leading-tight mt-4">{title}</h3>
            <p className="text-[#6d6d73] text-sm font-semibold mt-4">{formatDate(createdAt)}</p>
        </div>
    </a>
  )
}

