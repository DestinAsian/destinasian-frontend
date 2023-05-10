import { useState } from 'react'
import classNames from 'classnames/bind'
import Link from 'next/link'
import { Container, NavigationMenu, SkipNavigationLink } from '../../components'
import styles from './SingleHeader.module.scss'

let cx = classNames.bind(styles)

export default function SingleHeader({
  title = 'Headless by WP Engine',
  menuItems,
}) {
  const [isNavShown, setIsNavShown] = useState(false)

  return (
    <header className={cx('components')}>
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
            className="my-0 mr-4 flex w-4 cursor-pointer select-none items-center bg-transparent  text-3xl sm:mr-8 sm:w-8"
            onClick={() => setIsNavShown(!isNavShown)}
            aria-label="Toggle navigation"
            aria-controls={cx('primary-navigation')}
            aria-expanded={!isNavShown}
          >
            {/* menu button */}
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="40.000000pt"
              height="40.000000pt"
              viewBox="0 0 40.000000 40.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                transform="translate(0.000000,40.000000) scale(0.100000,-0.100000)"
                fill="#000000"
                stroke="none"
              >
                <path
                  d="M12 368 c-18 -18 -14 -46 7 -58 26 -13 336 -13 362 0 21 12 25 40 7
58 -17 17 -359 17 -376 0z"
                />
                <path
                  d="M12 228 c-7 -7 -12 -20 -12 -29 0 -35 23 -40 205 -37 157 3 179 5
189 21 8 12 8 22 0 35 -10 15 -32 17 -190 20 -131 2 -183 -1 -192 -10z"
                />
                <path
                  d="M17 89 c-20 -12 -22 -40 -5 -57 17 -17 359 -17 376 0 18 18 14 46 -7
58 -26 13 -340 13 -364 -1z"
                />
              </g>
            </svg>
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
              className="m-0 flex w-12 cursor-pointer select-none items-center bg-transparent px-4 py-3 text-3xl text-black xm:w-14"
              onClick={() => setIsNavShown(!isNavShown)}
              aria-label="Toggle navigation"
              aria-controls={cx('primary-navigation')}
              aria-expanded={!isNavShown}
            >
              {/* close button icon */}
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="512.000000pt"
                height="512.000000pt"
                viewBox="0 0 512.000000 512.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                  fill="#000000"
                  stroke="none"
                >
                  <path
                    d="M2330 5109 c-305 -29 -646 -126 -910 -259 -273 -138 -559 -356 -755
-576 -384 -432 -602 -931 -655 -1499 -41 -446 55 -949 260 -1355 138 -273 356
-559 576 -755 432 -384 931 -602 1499 -655 446 -41 949 55 1355 260 273 138
559 356 755 576 384 432 602 931 655 1499 41 446 -55 949 -260 1355 -138 273
-356 559 -576 755 -432 384 -931 602 -1499 655 -125 11 -320 11 -445 -1z
m-193 -1701 l423 -423 425 425 425 425 212 -213 213 -212 -425 -425 -425 -425
425 -425 425 -425 -213 -212 -212 -213 -425 425 -425 425 -425 -425 -425 -425
-212 213 -213 212 425 425 425 425 -425 425 -425 425 210 210 c115 115 212
210 215 210 3 0 195 -190 427 -422z"
                  />
                </g>
              </svg>
            </button>
          </NavigationMenu>
        </div>
      </Container>
    </header>
  )
}
