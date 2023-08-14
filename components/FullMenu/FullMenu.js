import { useQuery } from '@apollo/client'
import classNames from 'classnames/bind'
import {
  NavigationMenu,
  SearchInput,
  SearchResults,
  Button,
  LoadMore,
} from '..'
import styles from './FullMenu.module.scss'
import { useState, useEffect } from 'react'
import { GetSearchResults } from '../../queries/GetSearchResults'
import appConfig from '../../app.config'

let cx = classNames.bind(styles)

export default function FullMenu({
  primaryMenuItems,
  secondaryMenuItems,
  thirdMenuItems,
  fourthMenuItems,
  fifthMenuItems,
  featureMenuItems,
  latestStories,
}) {
  const [visiblePosts] = useState(3)
  const [searchQuery, setSearchQuery] = useState('')
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const postsPerPage = 5

  // Clear search input
  const clearSearch = () => {
    setSearchQuery(''); // Reset the search query
  };

  // Add search query function
  const {
    data: searchResultsData,
    loading: searchResultsLoading,
    error: searchResultsError,
    fetchMore,
  } = useQuery(GetSearchResults, {
    variables: {
      first: postsPerPage,
      after: null,
      search: searchQuery,
    },
    skip: searchQuery === '',
    fetchPolicy: 'network-only',
  })

  // Update query when load more button clicked
  const updateQuery = (previousResult, { fetchMoreResult }) => {
    if (!fetchMoreResult.contentNodes.edges.length) {
      return previousResult.contentNodes
    }

    return {
      contentNodes: {
        ...previousResult.contentNodes,
        edges: [
          ...previousResult.contentNodes.edges,
          ...fetchMoreResult.contentNodes.edges,
        ],
        pageInfo: fetchMoreResult.contentNodes.pageInfo,
      },
    }
  }

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrolledToBottom =
  //       window.scrollY + window.innerHeight >=
  //       document.documentElement.scrollHeight

  //     if (
  //       scrolledToBottom &&
  //       searchResultsData?.contentNodes?.pageInfo?.hasNextPage &&
  //       !isFetchingMore // Check if fetch operation is already in progress
  //     ) {
  //       setIsFetchingMore(true) // Set flag to indicate fetch in progress
  //       fetchMore({
  //         variables: {
  //           first: postsPerPage,
  //           after: searchResultsData?.contentNodes?.pageInfo?.endCursor,
  //         },
  //         updateQuery,
  //       }).then(() => {
  //         setIsFetchingMore(false) // Reset the flag after fetch is done
  //       })
  //     }
  //   }

  //   window.addEventListener('scroll', handleScroll)

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll)
  //   }
  // }, [searchResultsData, fetchMore, isFetchingMore]) // Include isFetchingMore in the dependencies

  // Check if the search query is empty and no search results are loading, then hide the SearchResults component
  const isSearchResultsVisible = !!(searchQuery && !searchResultsLoading)

  return (
    <div className={cx('component')}>
      {/* Full menu */}
      <div className={cx('full-menu-content')}>
        {/* Search Bar */}
        <div className={cx('search-bar-wrapper')}>
          <div className={cx('search-input-wrapper')}>
            <SearchInput
              value={searchQuery}
              onChange={(newValue) => setSearchQuery(newValue)}
              clearSearch={clearSearch}
            />
          </div>
          <div className={cx('search-result-wrapper')}>
            {searchResultsError && (
              <div className={cx('alert-error')}>
                {'An error has occurred. Please refresh and try again.'}
              </div>
            )}

            {/* Conditionally render the SearchResults component */}
            {isSearchResultsVisible && (
              <SearchResults
                searchResults={searchResultsData?.contentNodes?.edges?.map(
                  ({ node }) => node,
                )}
                isLoading={searchResultsLoading}
              />
            )}
            {searchResultsData?.contentNodes?.pageInfo?.hasNextPage &&
              searchResultsData?.contentNodes?.pageInfo?.endCursor && (
                <div className="mx-auto my-0 flex max-w-[100vw] justify-center md:max-w-[50vw]	">
                  <Button
                    onClick={() => {
                      if (
                        !isFetchingMore &&
                        searchResultsData?.contentNodes?.pageInfo?.hasNextPage
                      ) {
                        setIsFetchingMore(true) // Set flag to indicate fetch in progress
                        fetchMore({
                          variables: {
                            after:
                              searchResultsData?.contentNodes?.pageInfo?.endCursor,
                          },
                          updateQuery,
                        }).then(() => {
                          setIsFetchingMore(false) // Reset the flag after fetch is done
                        })
                      }
                    }}
                    className="gap-x-4	"
                  >
                    {isFetchingMore ? (
                      'Loading...' // Display loading text when fetching
                    ) : (
                      <>
                        Load More{' '}
                        <svg
                          className="h-auto w-8 origin-center rotate-90"
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
                              d="M1387 5110 c-243 -62 -373 -329 -272 -560 27 -62 77 -114 989 -1027
l961 -963 -961 -963 c-912 -913 -962 -965 -989 -1027 -40 -91 -46 -200 -15
-289 39 -117 106 -191 220 -245 59 -28 74 -31 160 -30 74 0 108 5 155 23 58
22 106 70 1198 1160 1304 1302 1202 1185 1202 1371 0 186 102 69 -1202 1371
-1102 1101 -1140 1137 -1198 1159 -67 25 -189 34 -248 20z"
                            />
                          </g>
                        </svg>
                      </>
                    )}
                  </Button>
                </div>
              )}
          </div>
        </div>
        <div className={cx('first-wrapper')}>
          {/* Secondary Menu {Destinations Menu} */}
          <NavigationMenu
            className={cx('secondary-navigation')}
            menuItems={secondaryMenuItems}
          />
        </div>
        <div className={cx('second-wrapper')}>
          {/* Primary Menu {Destination Guides Menu} */}
          <NavigationMenu
            className={cx('primary-navigation')}
            menuItems={primaryMenuItems}
          />
        </div>
        <div className={cx('third-wrapper')}>
          {/* Feature Stories & Latest Travel Stories */}
          <nav className={cx('feature-stories')}>
            <NavigationMenu
              className={cx('feature-navigation')}
              menuItems={featureMenuItems}
            />
          </nav>
          <nav className={cx('latest-stories')}>
            <ul className={cx('menu-name')}>{'Latest Travel Stories'}</ul>
            <ul className={cx('menu-content')}>
              {latestStories.length !== 0 &&
                latestStories.slice(0, visiblePosts).map((post) => (
                  <li key={post.id}>
                    <a href={post.uri}>{post.title}</a>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
        <div className={cx('fourth-wrapper')}>
          <div className={cx('left-wrapper')}>
            {/* Third Menu {Static Pages Menu} */}
            <NavigationMenu
              className={cx(['third-navigation'])}
              menuItems={thirdMenuItems}
            />
            {/* Fourth Menu {Newsletters Menu} */}
            <NavigationMenu
              className={cx(['fourth-navigation'])}
              menuItems={fourthMenuItems}
            />
          </div>
          <div className={cx('right-wrapper')}>
            {/* Fifth Menu {Print Magazine Menu} */}
            <NavigationMenu
              className={cx(['fifth-navigation'])}
              menuItems={fifthMenuItems}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
