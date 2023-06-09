import className from 'classnames/bind'
import { Heading, Container, CategoryIcon, LocationIcon } from '..'
import styles from './SingleEntryHeader.module.scss'

let cx = className.bind(styles)

export default function SingleEntryHeader({
  parent,
  title,
  className,
  parentCategory,
  categoryUri,
  categoryName,
  categoryLabel,
  chooseYourCategory,
  locationLabel,
  locationUrl,
  locationValidation
}) {
  return (
    <div className={cx(['component', className])}>
      <Container>
        <div className={cx('header-wrapper')}>
          <a href={categoryUri}>
            <div className={cx('category-name')}>
              {parentCategory} {categoryName}
            </div>
          </a>
          <Heading className={cx('title')}>
            {parent || null} {title}
          </Heading>
          <div className={cx('icon-wrapper')}>
            <CategoryIcon
              chooseYourCategory={chooseYourCategory}
              categoryLabel={categoryLabel}
            />
            <LocationIcon
              locationValidation={locationValidation}
              locationLabel={locationLabel}
              locationUrl={locationUrl}
            />
          </div>
        </div>
      </Container>
    </div>
  )
}
