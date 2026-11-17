import { format } from "date-fns"
import { SubtitleBlock } from "@/components/blog/SubtitleBlock"
import { ParagraphBlock } from "@/components/blog/ParagraphBlock"
import { getBlogPost } from "../actions"
import { pl } from "date-fns/locale"
import { CountQueuingStrategy } from "node:stream/web"


type Block = {
  type: string;
  id: string;
  data: { text:string }
}

export default async function BlogPage ({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id.slice(-36)
  const response = await getBlogPost(id)
  const {content, createdAt, image, layout, title} = response.data

  function formatDate(date: Date){
    const day = format(date, "dd")
    const month = format(date, "MMMM", {locale: pl})
    const year = format(date, "y")
    const fullDate = `${day} ${month} ${year}`
    return fullDate
  }

  return (
    <div className="w-full flex flex-col gap-12 mt-20 pb-16 px-4 md:px-0">
      {/* HEADER */}
      <div className="md:w-2/5 mx-auto flex flex-col gap-6">
        {/* LAYOUT AND DATE  */}
        <div className="flex flex-col gap-1 text-xs">
          <p className="text-[#6E6E73] font-bold">{layout.toUpperCase()}</p>
          <p className="text-[#6E6E73] font-semibold">{formatDate(createdAt)}</p>
        </div>
        {/* TITLE */}
        <h1 className="font-bold text-[#1D1D1F] text-3xl lg:text-5xl/15  tracking-tight">{title}</h1>
        {content[0].type as string == "subtitle" && <SubtitleBlock text="The next generation of AirTag - the bestselling item finder - is even easier to locate with more powerful Precision Finding, a longer Bluetooth range, and a louder speaker."/>}
      </div>
      
      {/* IMAGE */}
      <div className="w-full lg:w-7/12 lg:h-[660px] lg:aspect-video mx-auto overflow-hidden rounded-2xl 2 shadow-sm">
        <img className="w-full object-contain" src={image} alt={image} />
      </div>
      
      {/* BLOCKS */}
      <div className="md:w-2/5 mx-auto flex flex-col gap-6">
        {(content as Block[]).map((block) => {
        switch (block.type) {
          case "paragraph":
            return <ParagraphBlock text={block.data.text} key={block.id} />
          case "subtitle":
            return <SubtitleBlock text={block.data.text} key={block.id} />
          default:
            return <ParagraphBlock text={block.data.text} key={block.id} />
        }
      })}
    </div>
  </div>
  )
}