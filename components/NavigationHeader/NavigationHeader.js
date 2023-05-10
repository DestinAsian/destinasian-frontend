import classNames from 'classnames/bind'
import { Container, NavigationMenu } from '../../components'
import styles from './NavigationHeader.module.scss'

let cx = classNames.bind(styles)

// Add navigation below header

export default function NavigationHeader({ menuItems }) {
  return (
    <div className={cx('component')}>
      <Container>
        <NavigationMenu menuItems={menuItems} />
      </Container>
    </div>
  )
}
