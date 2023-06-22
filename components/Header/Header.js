import { gql, useQuery } from '@apollo/client'
import classNames from 'classnames/bind'
import Link from 'next/link'
import destinasianLogo from '../../assets/logo/destinasian-logo.png'
import {
  Container,
  NavigationMenu,
  SkipNavigationLink,
  Button,
  SearchInput,
  SearchResults,
} from '../../components'
import styles from './Header.module.scss'
import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { GetSearchResults } from '../../queries/GetSearchResults'
import appConfig from '../../app.config'

let cx = classNames.bind(styles)

export default function Header({
  primaryMenuItems,
  secondaryMenuItems,
  thirdMenuItems,
}) {
  const isDesktop = useMediaQuery({ minWidth: 768 })
  const [isNavShown, setIsNavShown] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)

  // Stop scrolling pages when isNavShown
  useEffect(() => {
    if (isNavShown) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [isNavShown])

  // Add search query function
  const {
    data: searchResultsData,
    loading: searchResultsLoading,
    error: searchResultsError,
    fetchMore: fetchMoreSearchResults,
  } = useQuery(GetSearchResults, {
    variables: {
      first: appConfig.postsPerPage,
      after: '',
      search: searchQuery,
    },
    skip: searchQuery === '',
    fetchPolicy: 'network-only',
  })

  // Add sticky header on scroll
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={cx('components', { sticky: isScrolled })}>
      <SkipNavigationLink />
      {/* Responsive header */}
      {isDesktop || (!isDesktop && !isNavShown) ? (
        <Container>
          <div className={cx('navbar')}>
            {/* DA logo */}
            <div className={cx('brand')}>
              <Link href="/">
                <a className={cx('title')}>
                  <img src={destinasianLogo.src} />
                </a>
              </Link>
            </div>

            {/* Search bar */}
            {/* <div className={cx('search-bar')}>
              <div className="absolute flex flex-col">
                <div className="bg-white">
                  <SearchInput
                    value={searchQuery}
                    onChange={(newValue) => setSearchQuery(newValue)}
                  />
                </div>
                <div className="z-10 bg-white">
                  {searchResultsError && (
                    <div className="alert-error">
                      An error has occurred. Please refresh and try again.
                    </div>
                  )}

                  <SearchResults
                    searchResults={searchResultsData?.contentNodes?.edges?.map(
                      ({ node }) => node,
                    )}
                    isLoading={searchResultsLoading}
                  />

                  {searchResultsData?.contentNodes?.pageInfo?.hasNextPage && (
                    <div className={styles['load-more']}>
                      <Button
                        onClick={() => {
                          fetchMoreSearchResults({
                            variables: {
                              after:
                                searchResultsData?.contentNodes?.pageInfo
                                  ?.endCursor,
                            },
                          })
                        }}
                      >
                        Load more
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div> */}

            {/* Menu Button */}
            {isNavShown == false ? (
              <div className={cx('menu-button')}>
                {/* menu button */}
                <button
                  type="button"
                  className={cx('menu-icon')}
                  onClick={() => setIsNavShown(!isNavShown)}
                  aria-label="Toggle navigation"
                  aria-controls={cx('full-menu-wrapper')}
                  aria-expanded={!isNavShown}
                >
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
              </div>
            ) : (
              <div className={cx('menu-button')}>
                {/* close button */}
                <button
                  type="button"
                  className={cx('close-icon')}
                  onClick={() => setIsNavShown(!isNavShown)}
                  aria-label="Toggle navigation"
                  aria-controls={cx('full-menu-wrapper')}
                  aria-expanded={!isNavShown}
                >
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
              </div>
            )}
          </div>
        </Container>
      ) : (
        <Container>
          <div className={cx('close-button')}>
            {/* close button */}
            <button
              type="button"
              className={cx('close-icon')}
              onClick={() => setIsNavShown(!isNavShown)}
              aria-label="Toggle navigation"
              aria-controls={cx('primary-navigation')}
              aria-expanded={!isNavShown}
            >
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
          </div>
        </Container>
      )}

      {/* Full menu */}
      <div
        className={cx(['full-menu-wrapper', isNavShown ? 'show' : undefined])}
      >
        {/* Full menu */}
        <div className={cx('full-menu-content')}>
          <div className={cx('first-wrapper')}>
            {/* Primary Menu {City Guides Menu} */}
            <NavigationMenu
              className={cx('primary-navigation')}
              menuItems={primaryMenuItems}
            />
          </div>
          <div className={cx('second-wrapper')}>
            {/* Secondary Menu {Destinations Menu} */}
            <NavigationMenu
              className={cx('secondary-navigation')}
              menuItems={secondaryMenuItems}
            />
          </div>
          <div className={cx('third-wrapper')}>
            {/* Third Menu {Static Pages Menu} */}
            <NavigationMenu
              className={cx(['third-navigation'])}
              menuItems={thirdMenuItems}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

Header.fragments = {
  entry: gql`
    fragment SearchQueryFragment on RootQueryToCategoryConnection {
      nodes {
        databaseId
        uri
        name
      }
    }
  `,
}
