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

export default function HomepageSliderDesktop({ images }) {
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
          delay: 25000,
          disableOnInteraction: true,
        }}
        pagination={pagination}
        navigation={{
          prevEl: '.swiper-custom-button-prev',
          nextEl: '.swiper-custom-button-next',
        }}
        modules={[EffectFade, Autoplay, Pagination, Navigation]}
        className="homepage-swiper"
      >
        {images?.map((media, index) => (
          <SwiperSlide key={index}>
            {media.type === 'image' && (
              <a href={media.url}>
                <img src={media.desktopSrc} alt={`Image ${index}`} />
              </a>
            )}
            {media.type === 'video' && (
              <video
                src={media.videoSrc}
                className="video-content"
                loop
                autoPlay
                playsInline
              />
            )}
          </SwiperSlide>
        ))}
        <div className="swiper-custom-button-prev">
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="512.000000pt"
            height="512.000000pt"
            viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              fill="#FFFFFF"
              stroke="none"
            >
              <path
                d="M1387 5110 c-243 -62 -373 -329 -272 -560 27 -62 77 -114 989 -1027
l961 -963 -961 -963 c-912 -913 -962 -965 -989 -1027 -40 -91 -46 -200 -15
-289 39 -117 106 -191 220 -245 59 -28 74 -31 160 -30 74 0 108 5 155 23 58
22 106 70 1198 1160 1304 1302 1202 1185 1202 1371 0 186 102 69 -1202 1371
-1102 1101 -1140 1137 -1198 1159 -67 25 -189 34 -248 20z"
              />
            </g>
          </svg>
        </div>
        <div className="swiper-custom-button-next">
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="512.000000pt"
            height="512.000000pt"
            viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              fill="#FFFFFF"
              stroke="none"
            >
              <path
                d="M1387 5110 c-243 -62 -373 -329 -272 -560 27 -62 77 -114 989 -1027
l961 -963 -961 -963 c-912 -913 -962 -965 -989 -1027 -40 -91 -46 -200 -15
-289 39 -117 106 -191 220 -245 59 -28 74 -31 160 -30 74 0 108 5 155 23 58
22 106 70 1198 1160 1304 1302 1202 1185 1202 1371 0 186 102 69 -1202 1371
-1102 1101 -1140 1137 -1198 1159 -67 25 -189 34 -248 20z"
              />
            </g>
          </svg>
        </div>
      </Swiper>
    </>
  )
}
