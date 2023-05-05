import { gql } from '@apollo/client'
import * as MENUS from '../constants/menus'
import { BlogInfoFragment } from '../fragments/GeneralSettings'
import {
  Header,
  Footer,
  Main,
  Container,
  EntryHeader,
  NavigationMenu,
  Post,
  FeaturedImage,
  SEO,
  ChildNavigation,
} from '../components'

export default function Component(props) {
  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? []
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? []
  const { name, posts, children, parent } = props.data.nodeByUri

  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />
      <Main>
        <>
          {/* children category navigation */}
          <div className="flex justify-center">
            {children.edges.map((post) => (
              <ChildNavigation name={post.node.name} uri={post.node.uri} />
            ))}
          </div>
          <EntryHeader 
          // parent={parent?.node.name} 
          title={`${name}`} 
          />
          <Container>
            {posts.edges.map((post) => (
              <Post
                title={post.node.title}
                content={post.node.content}
                date={post.node.date}
                author={post.node.author?.node.name}
                uri={post.node.uri}
                featuredImage={post.node.featuredImage?.node}
              />
            ))}
            {/* first children category posts */}
            {children.edges.node?.posts.edges.map((post) => (
              <Post
                title={post.node.title}
                content={post.node.content}
                date={post.node.date}
                uri={post.node.uri}
                featuredImage={post.node.featuredImage?.node}
              />
            ))}
            {/* second children category posts */}
            {/* {children.edges.map(
              (post) => (
                <div className='flex justify-center'>
                  {post.node.children.nodes?.posts.nodes.title}
                  {post.node.children.nodes?.posts.nodes.content}
                </div>
                // <Post
                //   title={post.node.title}
                //   content={post.node.content}
                //   date={post.node.date}
                //   uri={post.node.uri}
                //   featuredImage={post.node.featuredImage?.node}
                // />
              ),
            )} */}
          </Container>
        </>
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  )
}

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  ${FeaturedImage.fragments.entry}
  query GetCategoryPage(
    $uri: String!
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
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
                    id
                    title
                    content
                    date
                    uri
                    ...FeaturedImageFragment
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
                          id
                          title
                          content
                          date
                          uri
                          ...FeaturedImageFragment
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
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
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
    footerLocation: MENUS.FOOTER_LOCATION,
  }
}
