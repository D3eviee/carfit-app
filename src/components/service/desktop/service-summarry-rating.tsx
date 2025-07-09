import { Star } from "lucide-react";

type ServiceSumarryRatingProps = {
  id: string;
  rate: number;
  content: string;
}

export const ServiceSumarryRating = ({reviewsData}: {reviewsData: ServiceSumarryRatingProps[]}) => {
  const numberOfReviews = reviewsData.length;
  const averageRating = numberOfReviews > 0 ? reviewsData.reduce((sum, item) => sum + item.rate, 0) / numberOfReviews : 0
  const starSize = 15;

  const stars = Array.from({ length: 5 }).map((_, i) => {
    const starFill = Math.min(Math.max(averageRating - i, 0), 1);
    return starFill;
  });

  return (
    <div className="w-fit flex flex-row items-center gap-1.5">
      {/* NUMBER RATING */}
      <p className="font-bold text-[#8E8E92] leading-none text-base">{averageRating !== 0 ? averageRating.toFixed(1) : "Brak opinii"}</p>

      {/* STAR RATING */}
      {averageRating !== 0 && (
        <div className="flex gap-[1px]">
          {stars.map((fill, i) => (
            <div key={i} className="relative" style={{ width: starSize, height: starSize }}>
              {/* Empty stars */}
              <Star className="absolute top-0 left-0" size={starSize} color="#8E8E92" fill="none" strokeWidth={1}/>
              {/* Filled stars */}
              <div className="absolute top-0 left-0 overflow-hidden" style={{ width: starSize * fill, height: starSize }} >
                <Star size={starSize} color="#8E8E92" fill="#8E8E92"/>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* NUMBER OF REVIEWS */}
      {numberOfReviews > 0 && <p className="text-sm xl:text-base text-[#B1B1B4] font-normal leading-none">({numberOfReviews})</p>}
    </div>
  );
};
