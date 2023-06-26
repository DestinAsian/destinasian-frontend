import { gql } from '@apollo/client'
import * as MENUS from '../constants/menus'
import { BlogInfoFragment } from '../fragments/GeneralSettings'
import {
  SingleHeader,
  Footer,
  Main,
  Container,
  SingleEditorialEntryHeader,
  NavigationMenu,
  FeaturedImage,
  SEO,
  SingleEditorialFeaturedImage,
  ContentWrapperEditorial,
} from '../components'

export default function SingleEditorial(props) {
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
    author,
    date,
    acfSingleEditorialSlider,
  } = props?.data?.editorial
  const categories = props?.data?.editorial?.categories?.edges ?? []

  const images = [
    acfSingleEditorialSlider.slide1 != null
      ? acfSingleEditorialSlider.slide1.mediaItemUrl
      : null,
    acfSingleEditorialSlider.slide2 != null
      ? acfSingleEditorialSlider.slide1.mediaItemUrl
      : null,
    acfSingleEditorialSlider.slide3 != null
      ? acfSingleEditorialSlider.slide1.mediaItemUrl
      : null,
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
      <Main>
        <>
          <Container>
            <SingleEditorialFeaturedImage image={featuredImage?.node} />
            <SingleEditorialEntryHeader
              image={featuredImage?.node}
              title={title}
              categoryUri={categories[0]?.node?.uri}
              parentCategory={categories[0]?.node?.parent?.node?.name}
              categoryName={categories[0]?.node?.name}
              author={author.node.name}
              date={date}
            />
            <ContentWrapperEditorial content={content} images={images} />
            {/* <ModuleAd /> */}
          </Container>
        </>
      </Main>
      {/* <Footer title={siteTitle} menuItems={footerMenu} /> */}
    </>
  )
}

SingleEditorial.query = gql`
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
    editorial(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      date
      ...FeaturedImageFragment
      author {
        node {
          name
        }
      }
      acfSingleEditorialSlider {
        slide1 {
          mediaItemUrl
        }
        slide2 {
          mediaItemUrl
        }
        slide3 {
          mediaItemUrl
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

SingleEditorial.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
    headerLocation: MENUS.PRIMARY_LOCATION,
    secondHeaderLocation: MENUS.SECONDARY_LOCATION,
    thirdHeaderLocation: MENUS.THIRD_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  }
}
