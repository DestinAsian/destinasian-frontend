import { gql } from '@apollo/client'
import * as MENUS from '../constants/menus'
import { BlogInfoFragment } from '../fragments/GeneralSettings'
import {
  Header,
  Footer,
  Main,
  Container,
  ContentWrapper,
  NavigationMenu,
  FeaturedImage,
  SEO,
  HomepageSlider,
} from '../components'
import NavigationHeader from '../components/NavigationHeader/NavigationHeader'

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
  const navigationMenu = props?.data?.navigationMenuItems?.nodes ?? []
  const { content, featuredImage, acfHomepageSlider } = props?.data?.page ?? []

  const images = [
    {
      src: acfHomepageSlider.slide1.mediaItemUrl,
      url: acfHomepageSlider.slideLink1,
    },
    {
      src: acfHomepageSlider.slide2.mediaItemUrl,
      url: acfHomepageSlider.slideLink2,
    },
    {
      src: acfHomepageSlider.slide3.mediaItemUrl,
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
          <HomepageSlider images={images} />
          <Container>
            <div className="my-12">
              <ContentWrapper content={content} />
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
    $navigationLocation: MenuLocationEnum
    $asPreview: Boolean = false
    $first: Int = 20
  ) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      ...FeaturedImageFragment
      acfHomepageSlider {
        slide1 {
          mediaItemUrl
        }
        slide2 {
          mediaItemUrl
        }
        slide3 {
          mediaItemUrl
        }
        slideLink1
        slideLink2
        slideLink3
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
    navigationMenuItems: menuItems(where: { location: $navigationLocation }) {
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
    navigationLocation: MENUS.NAVIGATION_LOCATION,
    asPreview: ctx?.asPreview,
  }
}
