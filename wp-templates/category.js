import { gql } from '@apollo/client'
import * as MENUS from '../constants/menus'
import { BlogInfoFragment } from '../fragments/GeneralSettings'
import { PostFragment } from '../fragments/PostFragment'
import {
  CategoryHeader,
  SecondaryHeader,
  Footer,
  Main,
  Container,
  EntryHeader,
  NavigationMenu,
  Post,
  FeaturedImage,
  SEO,
} from '../components'

export default function Component(props) {
  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? []
  const secondaryMenu = props?.data?.secondHeaderMenuItems?.nodes ?? []
  const thirdMenu = props?.data?.thirdHeaderMenuItems?.nodes ?? []
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? []
  const { name, posts, children, parent } = props.data.nodeByUri

  const childPosts = []

  // loop through all the child categories and their posts
  children.edges.forEach((childCategory) => {
    childCategory.node.posts.edges.forEach((post) => {
      childPosts.push(post.node)
    })

    childCategory.node.children.edges.forEach((grandChildCategory) => {
      grandChildCategory.node.posts.edges.forEach((post) => {
        childPosts.push(post.node)
      })
    })
  })

  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />
      <CategoryHeader
        title={siteTitle}
        description={siteDescription}
        primaryMenuItems={primaryMenu}
        secondaryMenuItems={secondaryMenu}
        thirdMenuItems={thirdMenu}
        categoryName={name}
        parentCategoryName={parent?.node.name}
        children={children.edges.length}
      />

      <SecondaryHeader
        parent={parent}
        children={children}
      />

      {/* EntryHeader category name */}
      {children.edges.length != 0 ? (
        <EntryHeader title={`${name}`} />
      ) : (
        <EntryHeader parent={parent?.node.name} title={`${name}`} />
      )}

      <Main>
        <>
          <Container>
            {/* category post card */}
            {posts.edges != null
              ? posts.edges.map((post) => (
                  <Post
                    title={post.node.title}
                    content={post.node.content}
                    date={post.node.date}
                    author={post.node.author?.node.name}
                    uri={post.node.uri}
                    featuredImage={post.node.featuredImage?.node}
                  />
                ))
              : null}
            {/* childCategory post card */}
            {childPosts != null
              ? childPosts.map((post) => (
                  <div key={post.id}>
                    <Post
                      title={post.title}
                      content={post.content}
                      date={post.date}
                      uri={post.uri}
                      featuredImage={post.featuredImage?.node}
                    />
                  </div>
                ))
              : null}
          </Container>
        </>
      </Main>
      {/* <Footer title={siteTitle} menuItems={footerMenu} /> */}
    </>
  )
}

Component.query = gql`
  ${BlogInfoFragment}
  ${PostFragment}
  ${NavigationMenu.fragments.entry}
  ${FeaturedImage.fragments.entry}
  query GetCategoryPage(
    $uri: String!
    $headerLocation: MenuLocationEnum
    $secondHeaderLocation: MenuLocationEnum
    $thirdHeaderLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $first: Int = 20
  ) {
    nodeByUri(uri: $uri) {
      ... on Category {
        name
        posts {
          edges {
            node {
              id
              title
              content
              date
              uri
              ...FeaturedImageFragment
              author {
                node {
                  name
                }
              }
            }
          }
        }
        parent {
          node {
            name
            uri
            children(where: { childless: true }) {
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
              posts {
                edges {
                  node {
                    ...PostFragment
                  }
                }
              }
              children {
                edges {
                  node {
                    name
                    uri
                    posts {
                      edges {
                        node {
                          ...PostFragment
                        }
                      }
                    }
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

Component.variables = ({ uri }) => {
  return {
    uri,
    headerLocation: MENUS.PRIMARY_LOCATION,
    secondHeaderLocation: MENUS.SECONDARY_LOCATION,
    thirdHeaderLocation: MENUS.THIRD_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  }
}
