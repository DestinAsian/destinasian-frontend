import className from 'classnames/bind'
import { Heading, Container } from '..'
import styles from './CategoryEntryHeader.module.scss'

let cx = className.bind(styles)

const MAX_DESCRIPTION_LENGTH = 300 // Adjust the maximum length as needed

export default function CategoryEntryHeader({
  parent,
  title,
  image,
  description,
  className,
  children
}) {
  const hasText = title
  let trimmedDescription = '';

  if (children.length !== 0) {
    trimmedDescription = description.substring(0, MAX_DESCRIPTION_LENGTH);
    const lastSpaceIndex = trimmedDescription.lastIndexOf(' ');
  
    if (lastSpaceIndex !== -1) {
      trimmedDescription = trimmedDescription.substring(0, lastSpaceIndex) + '...';
    }

  }

  return (
    <div className={cx(['component', className])}>
      {hasText && (
        <div className={cx('text', { 'has-image': image })}>
          <Container>
            {!!title && (
              <Heading className={cx('title')}>
                {parent || null} {title}
              </Heading>
            )}
            {image != undefined && <img src={image} className={cx('image')} />}
            {children.length != 0 && (
              <p className={cx('description')}>{trimmedDescription}</p>
            )}
          </Container>
        </div>
      )}
    </div>
  )
}
