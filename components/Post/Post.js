import Link from 'next/link'
import classNames from 'classnames/bind'
import { FeaturedImage } from '../FeaturedImage'
import styles from './Post.module.scss'

let cx = classNames.bind(styles)

export default function Post({
  title,
  excerpt,
  parentCategory,
  category,
  categoryUri,
  uri,
  featuredImage,
}) {
  return (
    <article className={cx('component')}>
      <div className={cx('content-wrapper')}>
        <Link href={categoryUri}>
          <a>
            <h5 className={cx('category')}>
              {parentCategory} {category}
            </h5>
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
        <p className={cx('excerpt')}>{excerpt}</p>
      </div>
    </article>
  )
}
