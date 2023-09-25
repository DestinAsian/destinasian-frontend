import className from 'classnames/bind'
import styles from './ContentWrapperLL.module.scss'
import { SingleHCSlider } from '../SingleHCSlider'
import { SingleLLSlider } from '../SingleLLSlider'

let cx = className.bind(styles)

export default function ContentWrapperLL({ content, children, images }) {
  // const paragraphs = content?.split('<p>').filter(Boolean)

  // // Insert slider component after the fourth paragraph
  // if (paragraphs.length >= 4) {
  //   paragraphs.splice(4, 0, )
  // }

  // const updatedContent = paragraphs.join('<p>')

  return (
    <article className={cx('component')}>
      {images[0] != null && (
        <div className={cx('with-slider-wrapper')}>
          <div
            className={cx('content-wrapper')}
            dangerouslySetInnerHTML={{ __html: content }}
          />
          {children}
          <SingleLLSlider images={images} />
          <div className={cx('pagination-wrapper')}>{'Pagination'}</div>
        </div>
      )}
      {images[0] == null && (
        <div className={cx('with-slider-wrapper')}>
          <div
            className={cx('content-wrapper')}
            dangerouslySetInnerHTML={{ __html: content }}
          />
          {children}
          <div className={cx('pagination-wrapper')}>{'Pagination'}</div>
        </div>
      )}
    </article>
  )
}
