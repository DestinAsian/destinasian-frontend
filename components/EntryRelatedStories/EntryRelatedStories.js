import classNames from 'classnames/bind'
import styles from './EntryRelatedStories.module.scss'

let cx = classNames.bind(styles)

export default function EntryRelatedStories({
}) {

  return (
    <article className={cx('component')}>
      <div class={cx('entry-wrapper')}>
        <div className={cx('entry-title')}>{'Related Stories'}</div>
        <div class={cx('entry-border')}></div>
      </div>
    </article>
  )
}
