import { format } from "date-fns";
export const ArticleThumbnail = ({article}) => {
    const { id, image, createdAt, title, content, layout } = article

    function createSlug(title:string){
        const slug = title.toLowerCase().replace("-","-")
        return slug
    }

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
        href={`articles/${createSlug(title)}`}
    >  
        <div className="relative w-full aspect-[16/10] h-48 overflow-hidden min-h-1/2">
            <img 
                src={image}
                alt="alt"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
        </div>
    
        <div className="flex flex-col  w-full p-5 flex-1">
            <p className="text-xs w-fit px-2 py-0.5 rounded-lg {CATEGORY_STYLES[category]} text-white">{layout.toUpperCase()}</p>
            <h3 className="text-[#1D1D1F] h-full text-xl font-semibold line-clamp-4 leading-tight mt-4">{title}</h3>
            <p className="text-[#6d6d73] text-sm font-semibold mt-10">{formatDate(createdAt)}</p>
        </div>
    </a>
  )
}

