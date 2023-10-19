import React, { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './CategoryStories.module.scss'
import { useQuery } from '@apollo/client'
import { GetCategoryStories } from '../../queries/GetCategoryStories'
import { GetROSBannerAds } from '../../queries/GetROSBannerAds'
import { GetSpecificBannerAds } from '../../queries/GetSpecificBannerAds'
import { GetAdvertorialStories } from '../../queries/GetAdvertorialStories'
import { Post, ModuleAd, Button, AdvertorialPost } from '..'

let cx = classNames.bind(styles)

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export default function CategoryStories(categoryUri) {
  // Fetching Posts
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  // Declare state for banner ads
  const [ROSAdsArray, setROSAdsArray] = useState([])
  const [SpecificAdsArray, setSpecificAdsArray] = useState([])
  const [AdvertorialArray, setAdvertorialArray] = useState([])
  // Post per fetching
  const postsPerPage = 4
  const bannerPerPage = 20
  const advertPerPage = 5

  const uri = categoryUri?.categoryUri
  const pinPosts = categoryUri?.pinPosts
  const name = categoryUri?.name
  const children = categoryUri?.children
  const parent = categoryUri?.parent

  // Get Stories / Posts
  const { data, error, loading, fetchMore } = useQuery(GetCategoryStories, {
    variables: {
      first: postsPerPage,
      after: null,
      id: uri,
    },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  })

  const updateQuery = (prev, { fetchMoreResult }) => {
    if (!fetchMoreResult) return prev

    const prevEdges = prev?.category?.contentNodes?.edges || []
    const newEdges = fetchMoreResult?.category?.contentNodes?.edges || []

    return {
      ...prev,
      category: {
        ...prev.category,
        contentNodes: {
          ...prev.category.contentNodes,
          edges: [...prevEdges, ...newEdges],
          pageInfo: fetchMoreResult.category.contentNodes.pageInfo,
        },
      },
    }
  }

  // Get ROS Banner
  const {
    data: bannerROSData,
    error: bannerROSError,
    // fetchMore: fetchMoreROSBanner,
  } = useQuery(GetROSBannerAds, {
    variables: {
      first: bannerPerPage,
    },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  })

  if (bannerROSError) {
    return <pre>{JSON.stringify(error)}</pre>
  }

  let bannerVariable = {
    first: bannerPerPage,
    search: name,
  }

  if (
    data?.category?.children?.edges?.length === 0 &&
    data?.category?.parent?.node?.name !== null
  ) {
    // Modify the variables based on the condition
    bannerVariable = {
      search: parent, // Change this to the desired value
    }
  }

  if (data?.category?.parent?.node?.name === null) {
    // Modify the variables based on the condition
    bannerVariable = {
      search: name, // Change this to the desired value
    }
  }

  if (name === ('Trade Talk' || 'Airline News' || 'Travel News')) {
    // Modify the variables based on the condition
    bannerVariable = {
      search: name, // Change this to the desired value
    }
  }

  // Get Specific Banner
  const {
    data: bannerSpecificData,
    error: bannerSpecificError,
    // fetchMore: fetchMoreSpecificBanner,
  } = useQuery(GetSpecificBannerAds, {
    variables: bannerVariable,
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  })

  if (bannerSpecificError) {
    return <pre>{JSON.stringify(error)}</pre>
  }

  let queryVariables = {
    first: advertPerPage,
    search: null,
  }

  if (data?.category?.children?.edges?.length === 0) {
    // Modify the variables based on the condition
    queryVariables = {
      search: parent, // Change this to the desired value
    }
  }

  if (data?.category?.children?.edges?.length !== 0) {
    // Modify the variables based on the condition
    queryVariables = {
      search: name, // Change this to the desired value
    }
  }

  const {
    data: advertorialsData,
    error: advertorialsError,
    // fetchMore: fetchMoreSpecificBanner,
  } = useQuery(GetAdvertorialStories, {
    variables: queryVariables, // Use the modified variables
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  })

  if (advertorialsError) {
    return <pre>{JSON.stringify(error)}</pre>
  }

  // Function to shuffle the banner ads and store them in state
  // ROS Banner
  useEffect(() => {
    const shuffleBannerAds = () => {
      const bannerAdsArrayObj = Object.values(
        bannerROSData?.bannerAds?.edges || [],
      )

      // Separate shuffled banner ads with <img> tags from those without
      const bannerROSAdsWithImg = bannerAdsArrayObj.filter(
        (bannerAd) => !bannerAd?.node?.content.includes('<!--'),
      )

      const pinROSAds = bannerROSAdsWithImg.filter(
        (bannerAd) => !bannerAd?.node?.acfBannerAds?.pinAd === false || null,
      )

      const otherROSAds = bannerROSAdsWithImg.filter(
        (bannerAd) => !bannerAd?.node?.acfBannerAds?.pinAd === true,
      )

      // Shuffle only the otherBannerAds array
      const ROSOtherBannerAds = shuffleArray(otherROSAds)

      // Concatenate the arrays with pinned ads first and shuffled other banner ads
      const shuffledBannerAdsArray = [...pinROSAds, ...ROSOtherBannerAds]

      setROSAdsArray(shuffledBannerAdsArray)
    }

    // Shuffle the banner ads when the component mounts
    shuffleBannerAds()

    // Shuffle the banner ads every 10 seconds
    const shuffleInterval = setInterval(() => {
      shuffleBannerAds()
    }, 60000) // 10000 milliseconds = 10 seconds

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(shuffleInterval)
    }
  }, [bannerROSData]) // Use bannerROSData as a dependency to trigger shuffling when new data arrives

  // Function to shuffle the banner ads and store them in state

  // Specific Banner
  useEffect(() => {
    const shuffleBannerAds = () => {
      const bannerAdsArrayObj = Object.values(
        bannerSpecificData?.bannerAds?.edges || [],
      )

      // Separate shuffled banner ads with <img> tags from those without
      const bannerSpecificAdsWithImg = bannerAdsArrayObj.filter(
        (bannerAd) => !bannerAd?.node?.content.includes('<!--'),
      )

      const pinSpecificAds = bannerSpecificAdsWithImg.filter(
        (bannerAd) => !bannerAd?.node?.acfBannerAds?.pinAd === false || null,
      )

      const otherSpecificAds = bannerSpecificAdsWithImg.filter(
        (bannerAd) => !bannerAd?.node?.acfBannerAds?.pinAd === true,
      )

      // Shuffle only the otherBannerAds array
      const SpecificOtherBannerAds = shuffleArray(otherSpecificAds)

      // Concatenate the arrays with pinned ads first and shuffled other banner ads
      const shuffledBannerAdsArray = [
        ...pinSpecificAds,
        ...SpecificOtherBannerAds,
      ]

      setSpecificAdsArray(shuffledBannerAdsArray)
    }

    // Shuffle the banner ads when the component mounts
    shuffleBannerAds()

    // Shuffle the banner ads every 10 seconds
    const shuffleInterval = setInterval(() => {
      shuffleBannerAds()
    }, 60000) // 10000 milliseconds = 10 seconds

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(shuffleInterval)
    }
  }, [bannerSpecificData]) // Use bannerROSData as a dependency to trigger shuffling when new data arrives

  useEffect(() => {
    const shuffleAdvertorialPost = () => {
      const advertorialArray = Object.values(
        advertorialsData?.advertorials?.edges || [],
      )

      // Shuffle only the otherBannerAds array
      const shuffleAdvertorialPost = shuffleArray(advertorialArray)

      // Concatenate the arrays with pinned ads first and shuffled other banner ads
      const shuffledAdvertorialArray = [...shuffleAdvertorialPost]

      setAdvertorialArray(shuffledAdvertorialArray)
    }

    // Shuffle the banner ads when the component mounts
    shuffleAdvertorialPost()
  }, [advertorialsData])

  // Function to fetch more posts
  const fetchMorePosts = () => {
    if (
      !isFetchingMore &&
      data?.category?.contentNodes?.pageInfo?.hasNextPage
    ) {
      setIsFetchingMore(true)
      fetchMore({
        variables: {
          after: data?.category?.contentNodes?.pageInfo?.endCursor,
        },
        updateQuery,
      }).then(() => {
        setIsFetchingMore(false) // Reset the flag after fetch is done
      })
    }
  }

  // Scroll event listener to detect when user scrolls to the bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight

      if (scrolledToBottom) {
        // Call the function to fetch more when scrolled to the bottom
        fetchMorePosts()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [data, fetchMore])

  if (error) {
    return <pre>{JSON.stringify(error)}</pre>
  }

  if (loading) {
    return (
      <>
        <div className="mx-auto my-0 flex max-w-[100vw] justify-center md:max-w-[700px]	">
          <Button className="gap-x-4	">{'Loading...'}</Button>
        </div>
      </>
    )
  }

  const allPosts = data?.category?.contentNodes?.edges?.map((post) => post.node)

  // Declare Pin Posts
  const allPinPosts = pinPosts?.pinPost ? [pinPosts?.pinPost] : []

  // Merge All posts and Pin posts
  const mergedPosts = [...allPinPosts, ...allPosts].reduce(
    (uniquePosts, post) => {
      if (!uniquePosts.some((uniquePost) => uniquePost?.id === post?.id)) {
        uniquePosts.push(post)
      }
      return uniquePosts
    },
    [],
  )

  // Concatenate the arrays to place ads specificAds first
  const sortedBannerAdsArray = [...SpecificAdsArray, ...ROSAdsArray].reduce(
    (uniqueAds, ad) => {
      if (!uniqueAds.some((uniqueAd) => uniqueAd?.node?.id === ad?.node?.id)) {
        uniqueAds.push(ad)
      }
      return uniqueAds
    },
    [],
  )

  // Declare 1 Advertorial Post
  const getAdvertorialPost = AdvertorialArray[0]?.node
  const numberOfAdvertorial = advertorialsData?.advertorials?.edges?.length

  const numberOfBannerAds = sortedBannerAdsArray.length

  console.log(allPosts)

  return (
    <div className={cx('component')}>
      {mergedPosts.length !== 0 &&
        mergedPosts.map((post, index) => (
          <React.Fragment key={post?.id}>
            <Post
              title={post?.title}
              excerpt={post?.excerpt}
              content={post?.content}
              date={post?.date}
              author={post?.author?.node?.name}
              uri={post?.uri}
              parentCategory={
                post?.categories?.edges?.length !== 1
                  ? post?.categories?.edges
                      .filter((category) => category?.isPrimary === true) // Filter for isPrimary === true
                      .map((category) => category?.node?.parent?.node?.name)
                  : post?.categories?.edges[0]?.node?.parent?.node?.name
              }
              category={
                post?.categories?.edges?.length !== 1
                  ? post?.categories?.edges
                      .filter((category) => category?.isPrimary === true) // Filter for isPrimary === true
                      .map((category) => category?.node?.name)
                  : post?.categories?.edges[0]?.node?.name
              }
              categoryUri={
                post?.categories?.edges?.length !== 1
                  ? post?.categories?.edges
                      .filter((category) => category?.isPrimary === true) // Filter for isPrimary === true
                      .map((category) => category?.node?.uri)
                  : post?.categories?.edges[0]?.node?.uri
              }
              featuredImage={post?.featuredImage?.node}
              chooseYourCategory={post?.acfCategoryIcon?.chooseYourCategory}
              chooseIcon={post?.acfCategoryIcon?.chooseIcon?.mediaItemUrl}
              categoryLabel={post?.acfCategoryIcon?.categoryLabel}
              locationValidation={post?.acfLocationIcon?.fieldGroupName}
              locationLabel={post?.acfLocationIcon?.locationLabel}
              locationUrl={post?.acfLocationIcon?.locationUrl}
            />
            {/* Show 1st banner after 2 posts and then every 4 posts */}
            {(index - 1) % 4 === 0 && (
              <ModuleAd
                bannerAd={
                  sortedBannerAdsArray[((index - 1) / 4) % numberOfBannerAds]
                    ?.node?.content
                }
              />
            )}
            {index - 1 === 0 && (
              <>
                {numberOfAdvertorial !== 0 &&
                  name !==
                    ('Trade Talk' || 'Airline News' || 'Travel News') && (
                    <AdvertorialPost
                      title={getAdvertorialPost?.title}
                      excerpt={getAdvertorialPost?.excerpt}
                      uri={getAdvertorialPost?.uri}
                      featuredImage={getAdvertorialPost?.featuredImage?.node}
                    />
                  )}
              </>
            )}
          </React.Fragment>
        ))}
      {/* {mergedPosts.length && ( */}
      {mergedPosts.length && (
        <div className="mx-auto my-0 flex max-w-[100vw] justify-center md:max-w-[700px]	">
          {data?.category?.contentNodes?.pageInfo?.hasNextPage &&
            data?.category?.contentNodes?.pageInfo?.endCursor && (
              <Button
                onClick={() => {
                  if (
                    !isFetchingMore &&
                    data?.category?.contentNodes?.pageInfo?.hasNextPage
                  ) {
                    fetchMorePosts()
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
            )}
        </div>
      )}
    </div>
  )
}
