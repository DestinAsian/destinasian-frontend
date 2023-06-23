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
  // const { posts } = props?.data?.posts ?? []

  // console.log(posts)

  const isDesktop = useMediaQuery({ minWidth: 640 })
  const isMobile = useMediaQuery({ maxWidth: 639 })

  const featureWell = [
    {
      type: acfHomepageSlider.typeSlide1,
      desktopSrc: acfHomepageSlider.desktopSlide1.mediaItemUrl || null,
      mobileSrc: acfHomepageSlider.mobileSlide1.mediaItemUrl || null,
      videoSrc: acfHomepageSlider.video1.mediaItemUrl || null,
      url: acfHomepageSlider.slideLink1,
    },
    {
      type: acfHomepageSlider.typeSlide2,
      desktopSrc: acfHomepageSlider.desktopSlide2.mediaItemUrl || null,
      mobileSrc: acfHomepageSlider.mobileSlide2.mediaItemUrl || null,
      // videoSrc: acfHomepageSlider.video2.mediaItemUrl || null,
      url: acfHomepageSlider.slideLink2,
    },
    {
      type: acfHomepageSlider.typeSlide3,
      desktopSrc: acfHomepageSlider.desktopSlide3.mediaItemUrl || null,
      mobileSrc: acfHomepageSlider.mobileSlide3.mediaItemUrl || null,
      // videoSrc: acfHomepageSlider.video3.mediaItemUrl || null,
      url: acfHomepageSlider.slideLink3,
    },
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
          {isDesktop && (
            <Container>
              <HomepageSliderDesktop images={featureWell} />
            </Container>
          )}
          {isMobile && (
            <Container>
              <HomepageSliderMobile images={featureWell} />
            </Container>
          )}
          <Container>
            <div className="my-12">
              <ContentWrapper content={content} />
              <ModuleAd />
              {/* {posts.map((post) => (
                <Post
                  key={post.node.id}
                  title={post.node.title}
                  excerpt={post.node.excerpt}
                  content={post.node.content}
                  date={post.node.date}
                  author={post.node.author?.node.name}
                  uri={post.node.uri}
                  parentCategory={
                    post.node.categories.edges[0].node.parent?.node.name
                  }
                  category={post.node.categories.edges[0].node.name}
                  categoryUri={post.node.categories.edges[0].node.uri}
                  featuredImage={post.node.featuredImage?.node}
                />
              ))} */}
            </div>
          </Container>
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
    posts(first: $first) {
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
