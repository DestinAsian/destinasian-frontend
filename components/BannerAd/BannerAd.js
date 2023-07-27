import classNames from 'classnames/bind'
import styles from './BannerAd.module.scss'

let cx = classNames.bind(styles)

export default function BannerAd({ bannerAd }) {
  const isBannerEmpty = !bannerAd || bannerAd.trim() === ''

  return (
    <div
      className={cx('banner-wrapper')}
      style={{ display: isBannerEmpty ? 'none' : 'block' }}
    >
      {bannerAd && (
        <div className={cx('ad-container')}>
          <div
            className={cx('ad-content')}
            dangerouslySetInnerHTML={{ __html: bannerAd }}
          ></div>
        </div>
      )}
      <div className={cx('border-bottom')}></div>
    </div>
  )
}
