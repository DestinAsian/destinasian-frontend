import React, { useState, useEffect } from 'react'
import { gql } from '@apollo/client'
import * as MENUS from '../constants/menus'
import { BlogInfoFragment } from '../fragments/GeneralSettings'
import defaultImage from '../assets/images/example-image.png'
import {
  HCHeader,
  Footer,
  Main,
  Container,
  EntryHeader,
  NavigationMenu,
  FeaturedImage,
  SEO,
  SingleHCFeaturedImage,
  SingleHCEntryHeader,
  ContentWrapperHC,
  SingleHCSlider,
  Post,
  SingleHCPost,
  Button,
} from '../components'

export default function SingleHonorsCircle(props) {
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
  const {
    title,
    content,
    featuredImage,
    acfHCSlider,
    children,
    parent,
    hcLocation,
    hcCaption,
  } = props?.data?.honorsCircle

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

  // loop through all the main categories posts
  children.edges.forEach((post) => {
    mainPosts.push(post.node)
  })

  // sort posts by date
  const sortPostsByDate = (a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB - dateA // Sort in descending order
  }

  // sortByDate mainCat & childCat Posts
  const sortedMainPosts = mainPosts.sort(sortPostsByDate)

  // define allPosts
  const allPosts = [...(sortedMainPosts != null ? sortedMainPosts : [])]


  const images = [
    acfHCSlider.slide1 != null
      ? acfHCSlider.slide1.mediaItemUrl
      : defaultImage.src,
    acfHCSlider.slide2 != null
      ? acfHCSlider.slide2.mediaItemUrl
      : defaultImage.src,
    acfHCSlider.slide3 != null
      ? acfHCSlider.slide3.mediaItemUrl
      : defaultImage.src,
    acfHCSlider.slide4 != null
      ? acfHCSlider.slide4.mediaItemUrl
      : defaultImage.src,
    acfHCSlider.slide5 != null
      ? acfHCSlider.slide5.mediaItemUrl
      : defaultImage.src,
  ]

  return (
    <>
      <SEO
        title={siteTitle}
        description={siteDescription}
        imageUrl={featuredImage?.node?.sourceUrl}
      />

      {/* Countries pages */}
      {parent == null && (
        <HCHeader
          title={siteTitle}
          description={siteDescription}
          primaryMenuItems={primaryMenu}
          secondaryMenuItems={secondaryMenu}
          thirdMenuItems={thirdMenu}
        />
      )}
      {parent == null && (
        <Main>
          <>
            <Container>
              {/* {'countries'} */}
              {/* All posts sorted by mainPosts & date */}
              {allPosts.length !== 0 &&
                allPosts.slice(0, visiblePosts).map((post) => (
                  <React.Fragment key={post.id}>
                    <SingleHCPost
                      title={post.title}
                      content={post.content}
                      uri={post.uri}
                      featuredImage={post.featuredImage?.node}
                    />
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
            </Container>
          </>
        </Main>
      )}

      {/* Hotel pages */}
      {parent != null && (
        <HCHeader
          title={siteTitle}
          description={siteDescription}
          primaryMenuItems={primaryMenu}
          secondaryMenuItems={secondaryMenu}
          thirdMenuItems={thirdMenu}
        />
      )}
      {parent != null && (
        <Main>
          <>
            <Container>
              {/* {'hotel'} */}
              <SingleHCFeaturedImage image={featuredImage?.node} />
              <SingleHCEntryHeader
                title={title}
                locationLabel={hcLocation?.hcLocation}
                caption={hcCaption?.hcCaption}
              />
              {/* <SingleHCSlider images={images} /> */}
              <ContentWrapperHC content={content} images={images} />
            </Container>
          </>
        </Main>
      )}
      {/* <Footer /> */}
    </>
  )
}

SingleHonorsCircle.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  ${FeaturedImage.fragments.entry}
  query GetPost(
    $databaseId: ID!
    $headerLocation: MenuLocationEnum
    $secondHeaderLocation: MenuLocationEnum
    $thirdHeaderLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $asPreview: Boolean = false
    $first: Int = 20
  ) {
    honorsCircle(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      ...FeaturedImageFragment
      author {
        node {
          name
        }
      }
      hcLocation {
        hcLocation
      }
      hcCaption {
        hcCaption
      }
      acfHCSlider {
        slide1 {
          mediaItemUrl
        }
        slide2 {
          mediaItemUrl
        }
        slide3 {
          mediaItemUrl
        }
        slide4 {
          mediaItemUrl
        }
        slide5 {
          mediaItemUrl
        }
      }
      ...FeaturedImageFragment
      children {
        edges {
          node {
            ... on HonorsCircle {
              id
              title
              content
              uri
              ...FeaturedImageFragment
            }
          }
        }
      }
      parent {
        node {
          ... on HonorsCircle {
            title
            content
            date
          }
        }
      }
    }
    generalSettings {
      ...BlogInfoFragment
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
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`

SingleHonorsCircle.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
    headerLocation: MENUS.PRIMARY_LOCATION,
    secondHeaderLocation: MENUS.SECONDARY_LOCATION,
    thirdHeaderLocation: MENUS.THIRD_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  }
}
