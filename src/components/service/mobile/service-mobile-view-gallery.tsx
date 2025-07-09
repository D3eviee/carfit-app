'use client';
import { cn } from '@/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { ServiceMobileViewGalleryModal } from './service-mobile-view-gallery-modal';

type ServiceMobileViewGalleryProps = {
  images:{
    id: string;
    businessId: string;
    photoUrl: string;
    priority: number; 
  }[]
}

// this component provides slider gallery for service mobile view
export const ServiceMobileViewGallery = ({images}:ServiceMobileViewGalleryProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [scrollYOffset, setScrollYOffset] = useState<number>()

  const handleOpeningModal = () => {
    document.body.style.overflow = "hidden"
    setScrollYOffset(window.scrollY)
    setIsGalleryOpen(true)
  }

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const width = container.clientWidth;
    const index = Math.round(scrollLeft / width);
    setActiveIndex(index);
  };

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const width = container.clientWidth;
    container.scrollTo({
      left: width * index,
      behavior: 'smooth',
    });
  };

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (activeIndex > 0) {
      scrollToIndex(activeIndex - 1);
    }
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (activeIndex < images.length - 1) {
      scrollToIndex(activeIndex + 1);
    }
  };

  return (
    <>
    <ServiceMobileViewGalleryModal
      images={images}
      onClose={() => {setIsGalleryOpen(false)}}
      isOpen={isGalleryOpen}
      topPosition={scrollYOffset}
    />
    
    <div className='relative'>
      <div 
        onScroll={handleScroll}
        ref={scrollRef}
        className=" w-screen aspect-[16/10] flex overflow-x-auto snap-x snap-mandatory  scroll-smooth scrollbar-none"
      >
        {images.map((image) => (
          <div
            onClick={handleOpeningModal}
            key={image.id}
            className="flex-shrink-0 w-screen snap-center relative hover:cursor-pointer"
          >
            <Image
              src={image.photoUrl}
              alt="business image"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}
      </div>
      
      {/* NAV AND INITCATIORS */}
      <div 
        onClick={handleOpeningModal}
        className='absolute w-full bottom-3 flex flex-row justify-between items-end px-4 bg-transparent'
      >
        {/* INDICATORS */}
        <div className="flex  space-x-2 px-3 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-md">
          {images.map((_, i) => (
            <div
              key={i}
              className={cn("rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-sm",
                i === activeIndex ? "bg-white w-6 h-2 sm:w-8 sm:h-4" : "bg-white/10 w-2 h-2 sm:w-4 sm:h-4")}
            />
          ))}
        </div>

        {/* Nawigacja */}
        <div className='flex flex-row gap-5'>
          <button
            onClick={(e) => handlePrev(e)}
            className={cn("flex justify-center items-center border bg-white/20 backdrop-blur-md border-white/20 shadow-md text-white transition-opacity duration-300 rounded-full w-10 h-10 z-20",
              activeIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
            )}
          >
            <ChevronLeft strokeWidth={1.5}/>
          </button>
          <button
            onClick={(e) => handleNext(e)}
            className={cn("flex justify-center items-center border border-white/20 shadow-md backdrop-blur-md bg-white/10 text-white transition-opacity duration-300 rounded-full w-10 h-10 z-20",
              activeIndex === images.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
            )}
          >
            <ChevronRight strokeWidth={1.5}/>
          </button>
        </div>
      </div>
    </div>
    </>
  )
}