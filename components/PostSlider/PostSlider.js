import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { EffectFade, Autoplay, Pagination, Navigation } from 'swiper'

export default function PostSlider({ images }) {
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        modules={[EffectFade, Autoplay, Pagination, Navigation]}
        className="post-swiper"
      >
        {images?.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image}></img>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
