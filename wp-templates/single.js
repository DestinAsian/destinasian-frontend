import { gql } from '@apollo/client'
import * as MENUS from '../constants/menus'
import { BlogInfoFragment } from '../fragments/GeneralSettings'
import defaultImage from '../assets/images/example-image.png'
import {
  SingleHeader,
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
    acfLocationIcon,
  } = props?.data?.post
  const categories = props?.data?.post?.categories?.edges ?? []

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
        parentCategoryName={categories[0]?.node?.parent?.node?.name}
      />
      <SecondaryHeader
        categoryUri={categories[0]?.node?.uri}
        categories={categories[0]?.node?.parent}
        // parent={categories[0]?.node?.parent}
      />
      <Main>
        <>
          <SingleSlider images={images} />
          <SingleEntryHeader
            title={title}
            categoryUri={categories[0]?.node?.uri}
            parentCategory={categories[0]?.node?.parent?.node?.name}
            categoryName={categories[0]?.node?.name}
            chooseYourCategory={acfCategoryIcon?.chooseYourCategory}
            categoryLabel={acfCategoryIcon?.categoryLabel}
            locationValidation={acfLocationIcon?.fieldGroupName}
            locationLabel={acfLocationIcon?.locationLabel}
            locationUrl={acfLocationIcon?.locationUrl}
          />
          <Container>
            <ContentWrapper content={content} />
          </Container>
          <ModuleAd />
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
            uri
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
      }
      acfLocationIcon {
        fieldGroupName
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
    asPreview: ctx?.asPreview,
    headerLocation: MENUS.PRIMARY_LOCATION,
    secondHeaderLocation: MENUS.SECONDARY_LOCATION,
    thirdHeaderLocation: MENUS.THIRD_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  }
}
