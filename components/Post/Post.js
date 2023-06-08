import Link from 'next/link'
import classNames from 'classnames/bind'
import { FeaturedImage } from '../FeaturedImage'
import styles from './Post.module.scss'

let cx = classNames.bind(styles)

export default function Post({
  title,
  category,
  categoryUri,
  uri,
  featuredImage,
}) {
  return (
    <article className={cx('component')}>
      {featuredImage && (
        <div className={cx('content-wrapper-image')}>
          <Link href={uri}>
            <a>
              <FeaturedImage
                image={featuredImage}
                layout="intrinsic"
                className={styles.featuredImage}
              />
            </a>
          </Link>
        </div>
      )}

      <div className={cx('content-wrapper')}>
        <Link href={categoryUri}>
          <a>
            <h5 className={cx('category')}>{category}</h5>
          </a>
        </Link>
      </div>

      <div className={cx('content-wrapper')}>
        <Link href={uri}>
          <a>
            <h2 className={cx('title')}>{title}</h2>
          </a>
        </Link>
      </div>
    </article>
  )
}
