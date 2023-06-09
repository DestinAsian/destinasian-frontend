import React, { useState, useEffect } from 'react'
import { gql } from '@apollo/client'
import * as MENUS from '../constants/menus'
import { BlogInfoFragment } from '../fragments/GeneralSettings'
import { useMediaQuery } from 'react-responsive'
import {
  HomepageHeader,
  Main,
  Container,
  ContentWrapper,
  Post,
  SingleAdvertorialPost,
  NavigationMenu,
  FeaturedImage,
  SEO,
  HomepageSliderDesktop,
  HomepageSliderMobile,
  ModuleAd,
  FeatureWell,
  Button,
} from '../components'

export default function Component(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>
  }

  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? []
  const secondaryMenu = props?.data?.secondHeaderMenuItems?.nodes ?? []
  const thirdMenu = props?.data?.thirdHeaderMenuItems?.nodes ?? []
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? []
  const { content, featuredImage, acfHomepageSlider } = props?.data?.page ?? []
  const posts = props?.data?.posts ?? []
  const editorials = props?.data?.editorials ?? []
  const advertorials = props?.data?.advertorials ?? []

  // Load More Function
  const [visiblePosts, setVisiblePosts] = useState(4)
  const loadMorePosts = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 4)
  }

  // load more posts when scrolled to bottom
  const checkScrollBottom = () => {
    const scrolledToBottom =
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight

    if (scrolledToBottom) {
      // Call the loadMorePosts function to load additional posts
      loadMorePosts()
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      checkScrollBottom()
    }

    // Attach the event listener
    window.addEventListener('scroll', handleScroll)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const mainPosts = []
  const mainEditorialPosts = []
  const mainAdvertorialPosts = []

  // loop through all the main categories posts
  posts.edges.forEach((post) => {
    mainPosts.push(post.node)
  })

  // loop through all the main categories and their posts
  editorials.edges.forEach((post) => {
    mainEditorialPosts.push(post.node)
  })

  // loop through all the main categories and their posts
  advertorials.edges.forEach((post) => {
    mainAdvertorialPosts.push(post.node)
  })

  // sort posts by date
  const sortPostsByDate = (a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB - dateA // Sort in descending order
  }

  // define mainCatPostCards
  const mainCatPosts = [
    ...(mainPosts != null ? mainPosts : []),
    ...(mainEditorialPosts != null ? mainEditorialPosts : []),
  ]

  const advertorialPosts = [
    ...(mainAdvertorialPosts != null ? mainAdvertorialPosts : []),
  ]

  // sortByDate mainCat & childCat Posts
  const allPosts = mainCatPosts.sort(sortPostsByDate)

  const isDesktop = useMediaQuery({ minWidth: 640 })
  const isMobile = useMediaQuery({ maxWidth: 639 })

  const featureWell = [
    {
      type: acfHomepageSlider?.typeSlide1,
      videoSrc: acfHomepageSlider?.video1?.mediaItemUrl,
      desktopSrc: acfHomepageSlider?.desktopSlide2?.mediaItemUrl,
      mobileSrc: acfHomepageSlider?.mobileSlide2?.mediaItemUrl,
      url: acfHomepageSlider?.slideLink1,
    },
    {
      type: acfHomepageSlider?.typeSlide2,
      desktopSrc: acfHomepageSlider?.desktopSlide2?.mediaItemUrl,
      mobileSrc: acfHomepageSlider?.mobileSlide2?.mediaItemUrl,
      videoSrc: acfHomepageSlider?.video2?.mediaItemUrl,
      url: acfHomepageSlider?.slideLink2,
    },
    {
      type: acfHomepageSlider?.typeSlide3,
      desktopSrc: acfHomepageSlider?.desktopSlide3?.mediaItemUrl,
      mobileSrc: acfHomepageSlider?.mobileSlide3?.mediaItemUrl,
      videoSrc: acfHomepageSlider?.video3?.mediaItemUrl,
      url: acfHomepageSlider?.slideLink3,
    },
  ]

  const [currentFeatureWell, setCurrentFeatureWell] = useState(null)

  useEffect(() => {
    const filteredFeatureWell = featureWell.filter((item) => item.type !== null)

    if (filteredFeatureWell.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredFeatureWell.length)
      setCurrentFeatureWell(filteredFeatureWell[randomIndex])
    }
  }, [])

  return (
    <>
      <SEO
        title={siteTitle}
        description={siteDescription}
        imageUrl={featuredImage?.node?.sourceUrl}
      />
      <HomepageHeader
        title={siteTitle}
        description={siteDescription}
        primaryMenuItems={primaryMenu}
        secondaryMenuItems={secondaryMenu}
        thirdMenuItems={thirdMenu}
      />
      <Main>
        <>
          {/* <NavigationHeader menuItems={navigationMenu}/> */}

          <div className="snap-y snap-mandatory">
            <div className="snap-start">
              {currentFeatureWell && (
                <Container>
                  {isDesktop && (
                    <FeatureWell
                      type={currentFeatureWell.type}
                      videoSrc={currentFeatureWell.videoSrc}
                      desktopSrc={currentFeatureWell.desktopSrc}
                      url={currentFeatureWell.url}
                    />
                  )}
                  {isMobile && (
                    <FeatureWell
                      type={currentFeatureWell.type}
                      videoSrc={currentFeatureWell.videoSrc}
                      mobileSrc={currentFeatureWell.mobileSrc}
                      url={currentFeatureWell.url}
                    />
                  )}
                </Container>
              )}
            </div>
            <div className="snap-start pt-16">
              {/* <ContentWrapper content={content} /> */}
              {/* All posts sorted by mainPosts & date */}
              {allPosts.length !== 0 &&
                allPosts.slice(0, visiblePosts).map((post, index) => (
                  <React.Fragment key={post.id}>
                    <Post
                      title={post.title}
                      excerpt={post.excerpt}
                      content={post.content}
                      date={post.date}
                      author={post.author?.node?.name}
                      uri={post.uri}
                      parentCategory={
                        post.categories?.edges[0]?.node?.parent?.node?.name
                      }
                      category={post.categories?.edges[0]?.node?.name}
                      categoryUri={post.categories?.edges[0]?.node?.uri}
                      featuredImage={post.featuredImage?.node}
                      chooseYourCategory={
                        post.acfCategoryIcon?.chooseYourCategory
                      }
                      categoryLabel={post.acfCategoryIcon?.categoryLabel}
                      locationValidation={post.acfLocationIcon?.fieldGroupName}
                      locationLabel={post.acfLocationIcon?.locationLabel}
                      locationUrl={post.acfLocationIcon?.locationUrl}
                    />
                    {index === 1 && <ModuleAd moduleAd1 />}
                    {index === 5 && <ModuleAd moduleAd2 />}
                    {index === 9 && <ModuleAd moduleAd3 />}
                    {index === 13 && <ModuleAd moduleAd4 />}
                  </React.Fragment>
                ))}
              {visiblePosts < allPosts.length && (
                <div className="mx-auto my-0 flex max-w-[100vw] justify-center md:max-w-[50vw]	">
                  <Button onClick={loadMorePosts} className="gap-x-4	">
                    Load More{' '}
                    <svg
                      className="h-auto w-8 origin-center rotate-90	"
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
                  </Button>
                </div>
              )}
            </div>
          </div>
        </>
      </Main>
    </>
  )
}

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  ${FeaturedImage.fragments.entry}
  ${HomepageHeader.fragments.entry}
  query GetPageData(
    $databaseId: ID!
    $headerLocation: MenuLocationEnum
    $secondHeaderLocation: MenuLocationEnum
    $thirdHeaderLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $asPreview: Boolean = false
    $first: Int = 20
    $where: RootQueryToPostConnectionWhereArgs = { status: PUBLISH }
    $where1: RootQueryToEditorialConnectionWhereArgs = { status: PUBLISH }
    $where2: RootQueryToAdvertorialConnectionWhereArgs = { status: PUBLISH }
  ) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      ...FeaturedImageFragment
      acfHomepageSlider {
        desktopSlide1 {
          mediaItemUrl
        }
        desktopSlide2 {
          mediaItemUrl
        }
        desktopSlide3 {
          mediaItemUrl
        }
        mobileSlide1 {
          mediaItemUrl
        }
        mobileSlide2 {
          mediaItemUrl
        }
        mobileSlide3 {
          mediaItemUrl
        }
        video1 {
          mediaItemUrl
        }
        video2 {
          mediaItemUrl
        }
        video3 {
          mediaItemUrl
        }
        slideLink1
        slideLink2
        slideLink3
        typeSlide1
        typeSlide2
        typeSlide3
      }
    }
    posts(first: $first, where: $where) {
      edges {
        node {
          id
          title
          content
          date
          uri
          excerpt
          ...FeaturedImageFragment
          categories {
            edges {
              node {
                name
                uri
                parent {
                  node {
                    name
                  }
                }
              }
            }
          }
          acfCategoryIcon {
            categoryLabel
            chooseYourCategory
          }
          acfLocationIcon {
            fieldGroupName
            locationLabel
            locationUrl
          }
        }
      }
    }
    editorials(first: $first, where: $where1) {
      edges {
        node {
          id
          title
          content
          date
          uri
          excerpt
          ...FeaturedImageFragment
          categories {
            edges {
              node {
                name
                uri
                parent {
                  node {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
    advertorials(first: $first, where: $where2) {
      edges {
        node {
          id
          title
          content
          uri
          ...FeaturedImageFragment
        }
      }
    }
    generalSettings {
      ...BlogInfoFragment
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    headerMenuItems: menuItems(
      where: { location: $headerLocation }
      first: $first
    ) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    secondHeaderMenuItems: menuItems(
      where: { location: $secondHeaderLocation }
      first: $first
    ) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    thirdHeaderMenuItems: menuItems(
      where: { location: $thirdHeaderLocation }
      first: $first
    ) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    categories {
      ...SearchQueryFragment
    }
  }
`

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    headerLocation: MENUS.PRIMARY_LOCATION,
    secondHeaderLocation: MENUS.SECONDARY_LOCATION,
    thirdHeaderLocation: MENUS.THIRD_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    asPreview: ctx?.asPreview,
  }
}
