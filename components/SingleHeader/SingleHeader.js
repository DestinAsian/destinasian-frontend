import { useState } from 'react'
import classNames from 'classnames/bind'
import Link from 'next/link'
import { Container, NavigationMenu, SkipNavigationLink } from '../../components'
import styles from './SingleHeader.module.scss'
import { useScrollDirection } from '../Header/Header'

let cx = classNames.bind(styles)

export default function SingleHeader({
  title = 'Headless by WP Engine',
  menuItems,
}) {
  const [isNavShown, setIsNavShown] = useState(false)
  const scrollDirection = useScrollDirection()
  const [open, setOpen] = useState(false)

  return (
    <header
      // className={`sticky hidden ${
      //   scrollDirection === 'up' ? 'sliding-ttb !block relative	top-0' : '-top-24'
      // } z-50 bg-white`}
      className={cx('components')}
    >
      <SkipNavigationLink />
      <Container>
        <div className={cx('navbar')}>
          <div className={cx('brand')}>
            <Link href="/">
              <a className={cx('title')}>{title}</a>
            </Link>
          </div>
          <button
            type="button"
            className={cx('nav-toggle')}
            onClick={() => setIsNavShown(!isNavShown)}
            aria-label="Toggle navigation"
            aria-controls={cx('primary-navigation')}
            aria-expanded={!isNavShown}
          >
            ☰
          </button>
          <NavigationMenu
            className={cx([
              'primary-navigation',
              isNavShown ? 'show' : undefined,
            ])}
            menuItems={menuItems}
          >
            <button
              type="button"
              className="m-0 flex cursor-pointer select-none items-center bg-transparent px-4 py-3 text-3xl text-black"
              onClick={() => setIsNavShown(!isNavShown)}
              aria-label="Toggle navigation"
              aria-controls={cx('primary-navigation')}
              aria-expanded={!isNavShown}
            >
              x
            </button>
          </NavigationMenu>
        </div>
      </Container>
    </header>
  )
}
