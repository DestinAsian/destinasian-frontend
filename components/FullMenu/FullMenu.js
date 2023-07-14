import { gql, useQuery } from '@apollo/client'
import classNames from 'classnames/bind'
import { NavigationMenu, SearchInput, SearchResults } from '..'
import styles from './FullMenu.module.scss'
import { useState } from 'react'
import { GetSearchResults } from '../../queries/GetSearchResults'
import appConfig from '../../app.config'

let cx = classNames.bind(styles)

export default function FullMenu({
  primaryMenuItems,
  secondaryMenuItems,
  thirdMenuItems,
  fourthMenuItems,
  fifthMenuItems,
}) {
  const [searchQuery, setSearchQuery] = useState('')

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

  return (
    <div className={cx('component')}>
      {/* Search Bar */}
      <div className={cx('search-bar-wrapper')}>
        <div className={cx('search-bar')}>
          <div className={cx('search-input-wrapper')}>
            <SearchInput
              value={searchQuery}
              onChange={(newValue) => setSearchQuery(newValue)}
            />
            {/* <div className={cx('search-result-wrapper')}>
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
                </div> */}
          </div>
        </div>
      </div>
      {/* Full menu */}
      <div className={cx('full-menu-content')}>
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
            <ul className={cx('menu-name')}>{'Feature Stories'}</ul>
          </nav>
          <nav className={cx('latest-travel-stories')}>
            <ul className={cx('menu-name')}>{'Latest Travel Stories'}</ul>
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

FullMenu.fragments = {
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
