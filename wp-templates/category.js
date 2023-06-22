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
  CategoryEntryHeader,
  NavigationMenu,
  Post,
  FeaturedImage,
  SEO,
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
    name,
    description,
    categoryImages,
    posts,
    editorials,
    children,
    parent,
  } = props.data.nodeByUri

  const mainPosts = []
  const childPosts = []
  const mainEditorialPosts = []
  const childEditorialPosts = []

  // loop through all the main categories and their posts
  posts.edges.forEach((post) => {
    mainPosts.push(post.node)
  })

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

  // loop through all the main categories and their posts
  editorials.edges.forEach((post) => {
    mainEditorialPosts.push(post.node)
  })

  // loop through all the child editorial categories and their posts
  children.edges.forEach((childCategory) => {
    childCategory.node.editorials.edges.forEach((post) => {
      childEditorialPosts.push(post.node)
    })

    childCategory.node.children.edges.forEach((grandChildCategory) => {
      grandChildCategory.node.editorials.edges.forEach((post) => {
        childEditorialPosts.push(post.node)
      })
    })
  })

  // sort posts by date
  const sortPostsByDate = (a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB - dateA // Sort in descending order
  }

  // define allPostsCards
  const allPosts = [
    ...(mainPosts != null ? mainPosts : []),
    ...(mainEditorialPosts != null ? mainEditorialPosts : []),
    ...(childPosts != null ? childPosts : []),
    ...(childEditorialPosts != null ? childEditorialPosts : []),
  ]

  const sortedPosts = allPosts.sort(sortPostsByDate)

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

      <SecondaryHeader parent={parent} children={children} />

      {/* EntryHeader category name */}
      {children.edges.length != 0 ? (
        <CategoryEntryHeader
          title={`${name}`}
          image={categoryImages.categoryImages.mediaItemUrl}
          description={description}
          children={children.edges}
        />
      ) : (
        <CategoryEntryHeader
          parent={parent?.node.name}
          title={`${name}`}
          children={children.edges}
        />
      )}

      <Main>
        <>
          <Container>
            {/* All posts sorted by date */}
            {sortedPosts.map((post) => (
              <Post
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                content={post.content}
                date={post.date}
                author={post.author?.node.name}
                uri={post.uri}
                parentCategory={post.categories.edges[0].node.parent?.node.name}
                category={post.categories.edges[0].node.name}
                categoryUri={post.categories.edges[0].node.uri}
                featuredImage={post.featuredImage?.node}
              />
            ))}
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
        description
        categoryImages {
          categoryImages {
            mediaItemUrl
          }
        }
        posts {
          edges {
            node {
              id
              title
              content
              date
              uri
              excerpt
              ...FeaturedImageFragment
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
                      }
                    }
                  }
                }
              }
            }
          }
        }
        editorials {
          edges {
            node {
              id
              title
              content
              date
              uri
              excerpt
              ...FeaturedImageFragment
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
                      }
                    }
                  }
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
              editorials {
                edges {
                  node {
                    id
                    title
                    content
                    date
                    uri
                    excerpt
                    ...FeaturedImageFragment
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
                            }
                          }
                        }
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
                    editorials {
                      edges {
                        node {
                          id
                          title
                          content
                          date
                          uri
                          excerpt
                          ...FeaturedImageFragment
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
