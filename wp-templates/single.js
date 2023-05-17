import { gql } from '@apollo/client'
import * as MENUS from '../constants/menus'
import { BlogInfoFragment } from '../fragments/GeneralSettings'
import {
  SingleHeader,
  Header,
  Footer,
  Main,
  Container,
  SingleEntryHeader,
  NavigationMenu,
  ContentWrapper,
  FeaturedImage,
  SEO,
  SingleSlider,
  SecondaryHeader,
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
  const {
    title,
    content,
    featuredImage,
    date,
    author,
    acfPostSlider,
    acfCategoryIcon,
  } = props?.data?.post
  const categories = props?.data?.post?.categories?.edges ?? []

  const images = [
    acfPostSlider.slide1.mediaItemUrl,
    acfPostSlider.slide2.mediaItemUrl,
    acfPostSlider.slide3.mediaItemUrl,
    acfPostSlider.slide4.mediaItemUrl,
    acfPostSlider.slide5.mediaItemUrl,
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
        parentCategoryName={categories[0]?.node?.parent?.node?.name}
      />
      <SecondaryHeader
        parent={categories[0]?.node?.parent}
        children={categories[0]?.node?.children}
      />
      <Main>
        <>
          <SingleSlider images={images} />
          <SingleEntryHeader
            title={title}
            parentCategory={categories[0]?.node?.parent?.node?.name}
            categoryName={categories[0]?.node?.name}
            chooseYourCategory={acfCategoryIcon?.chooseYourCategory}
            categoryLabel={acfCategoryIcon?.categoryLabel}
            locationLabel={acfCategoryIcon?.locationLabel}
            locationUrl={acfCategoryIcon?.locationUrl}
          />
          <Container>
            <ContentWrapper content={content} />
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
  query GetPost(
    $databaseId: ID!
    $headerLocation: MenuLocationEnum
    $secondHeaderLocation: MenuLocationEnum
    $thirdHeaderLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $asPreview: Boolean = false
    $first: Int = 20
  ) {
    post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      date
      author {
        node {
          name
        }
      }
      categories {
        edges {
          node {
            name
            parent {
              node {
                name
                uri
                children {
                  edges {
                    node {
                      name
                      uri
                    }
                  }
                }
              }
            }
            children {
              edges {
                node {
                  name
                  uri
                }
              }
            }
          }
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
      acfCategoryIcon {
        categoryLabel
        chooseYourCategory
        locationLabel
        locationUrl
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
