import { gql } from '@apollo/client'
import * as MENUS from '../constants/menus'
import { BlogInfoFragment } from '../fragments/GeneralSettings'
import defaultImage from '../assets/images/example-image.png'
import {
  SingleHeader,
  Footer,
  Main,
  SingleAdvertorialContainer,
  SingleAdvertorialEntryHeader,
  NavigationMenu,
  FeaturedImage,
  SEO,
  SingleAdvertorialSlider,
  ContentWrapper,
} from '../components'

export default function SingleAdvertorial(props) {
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
  const { title, content, featuredImage, author, date, acfPostSlider } =
    props?.data?.advertorial

  const images = [
    acfPostSlider.slide1 != null
      ? acfPostSlider.slide1.mediaItemUrl
      : defaultImage.src,
    acfPostSlider.slide2 != null
      ? acfPostSlider.slide2.mediaItemUrl
      : defaultImage.src,
    acfPostSlider.slide3 != null
      ? acfPostSlider.slide3.mediaItemUrl
      : defaultImage.src,
    acfPostSlider.slide4 != null
      ? acfPostSlider.slide4.mediaItemUrl
      : defaultImage.src,
    acfPostSlider.slide5 != null
      ? acfPostSlider.slide5.mediaItemUrl
      : defaultImage.src,
  ]

  return (
    <>
      <SEO
        title={siteTitle}
        description={siteDescription}
        imageUrl={featuredImage?.node?.sourceUrl}
      />
      <SingleHeader
        title={siteTitle}
        description={siteDescription}
        primaryMenuItems={primaryMenu}
        secondaryMenuItems={secondaryMenu}
        thirdMenuItems={thirdMenu}
      />
      <Main>
        <>
          <SingleAdvertorialContainer>
            <SingleAdvertorialSlider images={images} />
            <SingleAdvertorialEntryHeader title={title} />
            <ContentWrapper content={content} />
            {/* <ModuleAd /> */}
          </SingleAdvertorialContainer>
        </>
      </Main>
      {/* <Footer title={siteTitle} menuItems={footerMenu} /> */}
    </>
  )
}

SingleAdvertorial.query = gql`
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
    advertorial(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      date
      ...FeaturedImageFragment
      author {
        node {
          name
        }
      }
      acfPostSlider {
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

SingleAdvertorial.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
    headerLocation: MENUS.PRIMARY_LOCATION,
    secondHeaderLocation: MENUS.SECONDARY_LOCATION,
    thirdHeaderLocation: MENUS.THIRD_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  }
}
