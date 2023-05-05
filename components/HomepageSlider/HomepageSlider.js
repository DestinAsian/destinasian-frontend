import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { EffectFade, Autoplay, Pagination, Navigation} from 'swiper'

export default function HomepageSlider({ images }) {
  const pagination = {
    clickable: true,
  }

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
        pagination={pagination}
        modules={[EffectFade, Autoplay, Pagination, Navigation]}
        navigation={true}
        className="homepage-swiper"
      >
        {images?.map((image, index) => (
          <SwiperSlide key={index}>
            <a href={image.url}>
              <img src={image.src}></img>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
