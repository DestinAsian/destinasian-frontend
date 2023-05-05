import Link from 'next/link';
import classNames from 'classnames/bind'
import { FeaturedImage } from '../FeaturedImage';
import styles from './Post.module.scss';

let cx = classNames.bind(styles)

export default function Post({
  title,
  uri,
  featuredImage,
}) {
  return (
    <article className={cx('component')}>
      {featuredImage && (
        <Link href={uri}>
          <a>
            <FeaturedImage
              image={featuredImage}
              layout="responsive"
              className={styles.featuredImage}
            />
          </a>
        </Link>
      )}

      <Link href={uri}>
        <a>
          <h2 className={cx('title')}>{title}</h2>
        </a>
      </Link>
    </article>
  );
}
