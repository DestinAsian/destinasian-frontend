import className from 'classnames/bind'
import { Heading } from '..'
import styles from './SingleHCEntryHeader.module.scss'
import { useState, useEffect } from 'react'
import locationIcon from '../../assets/icons/icon-location.png'
import captionIcon from '../../assets/icons/icon-hc-caption.png'
import hcLogo from '../../assets/logo/honors-circle-logo.png'

let cx = className.bind(styles)

export default function SingleHCEntryHeader({ title, locationLabel, caption }) {
  const [isMaximized, setIsMaximized] = useState(false)

  // Maximized EntryHeader when page load
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMaximized(true)
    }, 2000) // Change the timeframe (in milliseconds) as per your requirement

    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className={cx('component', { maximized: isMaximized })}>
      {/* HC Icon */}
      <div className={cx('hc-wrapper')}>
        <div className={cx('hc-label')}>{'Honors Circle'}</div>
        <div class={cx('hc-border')}></div>
      </div>
      <div className={cx('header-wrapper')}>
        <Heading className={cx('title')}>{title}</Heading>
      </div>
      <div className={cx('meta-wrapper')}>
        <div className={cx('icon-wrapper')}>
          {/* Location Icon */}
          <div className={cx('location-icon')}>
            <img src={locationIcon.src} />
          </div>
          {/* Location label */}
          <div className={cx('icon-label')}>{locationLabel}</div>
        </div>
        {/* Caption Icon */}
        {/* <div className={cx('icon-wrapper')}>
          <div className={cx('caption-icon')}>
            <img src={captionIcon.src} />
          </div>
          <div className={cx('icon-label')}>{caption}</div>
        </div> */}
      </div>
    </div>
  )
}
