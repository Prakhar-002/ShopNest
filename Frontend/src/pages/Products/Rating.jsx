
/*
?   Node modules
*/

import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value, text, color }) => {
      const fullStars = Math.floor(value);
      const halfStar = value - fullStars >= 0.5 ? 1 : 0;
      const emptyStar = 5 - fullStars - halfStar;

      return (
            <div className="flex items-center gap-1">
                  {[...Array(fullStars)].map((_, i) => (
                        <FaStar key={`full-${i}`} className={`${color}`} />
                  ))}

                  {halfStar === 1 && <FaStarHalfAlt className={`${color}`} />}

                  {[...Array(emptyStar)].map((_, i) => (
                        <FaRegStar key={`empty-${i}`} className={`${color}`} />
                  ))}

                  {text && (
                        <span className="ml-3 text-sm font-medium text-gray-300">
                              {text}
                        </span>
                  )}
            </div>
      );
};


export default Rating;
