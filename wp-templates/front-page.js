import React, { useState, useRef } from 'react'
import { gql } from '@apollo/client'
import * as MENUS from '../constants/menus'
import { BlogInfoFragment } from '../fragments/GeneralSettings'
import { useMediaQuery } from 'react-responsive'
import {
  Header,
  Footer,
  Main,
  Container,
  ContentWrapper,
  Post,
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

  // Load More Function
  const [visiblePosts, setVisiblePosts] = useState(4)
  const loadMorePosts = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 4)
  }

  const mainPosts = []
  const mainEditorialPosts = []

  // loop through all the main categories posts
  posts.edges.forEach((post) => {
    mainPosts.push(post.node)
  })

  // loop through all the main categories and their posts
  editorials.edges.forEach((post) => {
    mainEditorialPosts.push(post.node)
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

  // sortByDate mainCat & childCat Posts
  const allPosts = mainCatPosts.sort(sortPostsByDate)

  const isDesktop = useMediaQuery({ minWidth: 640 })
  const isMobile = useMediaQuery({ maxWidth: 639 })

  const featureWell = [
    {
      videoSrc: acfHomepageSlider.video1.mediaItemUrl || null,
    },
    // {
    //   type: acfHomepageSlider.typeSlide2,
    //   desktopSrc: acfHomepageSlider.desktopSlide2.mediaItemUrl || null,
    //   mobileSrc: acfHomepageSlider.mobileSlide2.mediaItemUrl || null,
    //   // videoSrc: acfHomepageSlider.video2.mediaItemUrl || null,
    //   url: acfHomepageSlider.slideLink2,
    // },
    // {
    //   type: acfHomepageSlider.typeSlide3,
    //   desktopSrc: acfHomepageSlider.desktopSlide3.mediaItemUrl || null,
    //   mobileSrc: acfHomepageSlider.mobileSlide3.mediaItemUrl || null,
    //   // videoSrc: acfHomepageSlider.video3.mediaItemUrl || null,
    //   url: acfHomepageSlider.slideLink3,
    // },
  ]

  return (
    <>
      <SEO
        title={siteTitle}
        description={siteDescription}
        imageUrl={featuredImage?.node?.sourceUrl}
      />
      <Header
        title={siteTitle}
        description={siteDescription}
        primaryMenuItems={primaryMenu}
        secondaryMenuItems={secondaryMenu}
        thirdMenuItems={thirdMenu}
      />
      <Main>
        <>
          {/* <NavigationHeader menuItems={navigationMenu}/> */}
          {/* {isDesktop && (
            <Container>
              <HomepageSliderDesktop images={featureWell} />
            </Container>
          )}
          {isMobile && (
            <Container>
              <HomepageSliderMobile images={featureWell} />
            </Container>
          )} */}
          <div className="h-screen snap-y snap-proximity overflow-scroll">
            <div className="flex h-screen w-screen snap-start items-center justify-center">
              <FeatureWell featureWell={featureWell} />
            </div>
            <div className="pt-20 h-screen  w-screen snap-start items-center justify-center">
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
                      author={post.author?.node.name}
                      uri={post.uri}
                      parentCategory={
                        post.categories.edges[0].node.parent?.node.name
                      }
                      category={post.categories.edges[0].node.name}
                      categoryUri={post.categories.edges[0].node.uri}
                      featuredImage={post.featuredImage?.node}
                    />
                    {index === 0 && <ModuleAd moduleAd1 />}
                    {index === 2 && <ModuleAd moduleAd2 />}
                    {index === 4 && <ModuleAd moduleAd3 />}
                    {index === 6 && <ModuleAd moduleAd4 />}
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
      {/* <Footer title={siteTitle} menuItems={footerMenu} /> */}
    </>
  )
}

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  ${FeaturedImage.fragments.entry}
  ${Header.fragments.entry}
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
