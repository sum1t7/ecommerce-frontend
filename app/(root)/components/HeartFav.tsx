import { HeartIcon } from 'lucide-react'
import React, { useState } from 'react'


const HeartFavourite = () => {
  const [isLiked, setIsLiked] = useState(false);
  return (
  <button   className="absolute top-2 right-2 z-10 p-2 bg-black rounded-full">
              <HeartIcon fill={`${isLiked ? "black":"white"}`}  />

  </button>
  )
}

export default HeartFavourite