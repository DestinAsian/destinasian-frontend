import React from 'react'
import className from 'classnames/bind'
import styles from './FeatureWell.module.scss'
import { useMediaQuery } from 'react-responsive'

let cx = className.bind(styles)

export default function FeatureWell({
  type,
  videoSrc,
  desktopSrc,
  mobileSrc,
  url,
}) {
  const isDesktop = useMediaQuery({ minWidth: 640 })
  const isMobile = useMediaQuery({ maxWidth: 639 })

  return (
    <>
      <div className={cx('component')}>
        {type === 'image' && (
          <a href={url}>
            {isDesktop && <img src={desktopSrc} />}
            {isMobile && <img src={mobileSrc} />}
          </a>
        )}
        {type === 'video' && (
          <video
            src={videoSrc}
            className="video-content"
            loop
            autoPlay
            playsInline
            muted
          />
        )}
      </div>
    </>
  )
}
