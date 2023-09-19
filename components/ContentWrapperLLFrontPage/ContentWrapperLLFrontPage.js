import className from 'classnames/bind'
import styles from './ContentWrapperLLFrontPage.module.scss'

let cx = className.bind(styles)

export default function ContentWrapperLLFrontPage({ content }) {
  return (
    <article className={cx('component')}>
      <div
        className={cx('content-wrapper')}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  )
}
