'use client'
import { ArticleThumbnail } from "@/components/blog/ArticleThumbnail"
import { useGetBlogPosts } from "@/lib/hooks/client/useGetBlogPosts"

export default function PolicyPage() {
  const query = useGetBlogPosts()

  const data = query.data
  if(!data) return 

  return (
   <div className="flex flex-col gap-24 md:gap-32 ">
    <h1 className="w-3/4 mx-auto px-36 text-[#1D1D1F] text-5xl font-bold">BLOG</h1>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  overflow-hidden w-3/4 mx-auto px-36">
      {data.map(article => (
        <ArticleThumbnail article={article} key={article.id}/>
      ))}
    </div>
  </div>
  )
}
