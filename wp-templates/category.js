import React, { useState } from 'react'
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
  ModuleAd,
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
  const {
    name,
    description,
    categoryImages,
    posts,
    editorials,
    children,
    parent,
  } = props?.data?.nodeByUri ?? []

  // Load More Function
  const [visiblePosts, setVisiblePosts] = useState(4)
  const loadMorePosts = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 4)
  }

  // load more posts when scrolled to bottom
  const checkScrollBottom = () => {
    const scrolledToBottom =
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight

    if (scrolledToBottom) {
      // Call the loadMorePosts function to load additional posts
      loadMorePosts()
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      checkScrollBottom()
    }

    // Attach the event listener
    window.addEventListener('scroll', handleScroll)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const mainPosts = []
  const childPosts = []
  const mainEditorialPosts = []
  const childEditorialPosts = []

  // loop through all the main categories posts
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

  // define mainCatPostCards
  const mainCatPosts = [
    ...(mainPosts != null ? mainPosts : []),
    ...(mainEditorialPosts != null ? mainEditorialPosts : []),
  ]

  // define childCatPostCards
  const childCatPosts = [
    ...(childPosts != null ? childPosts : []),
    ...(childEditorialPosts != null ? childEditorialPosts : []),
  ]

  // sortByDate mainCat & childCat Posts
  const sortedMainPosts = mainCatPosts.sort(sortPostsByDate)
  const sortedChildPosts = childCatPosts.sort(sortPostsByDate)

  // define allPosts
  const allPosts = [
    ...(sortedMainPosts != null ? sortedMainPosts : []),
    ...(sortedChildPosts != null ? sortedChildPosts : []),
  ]

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
          image={categoryImages.categoryImages?.mediaItemUrl || null}
          description={description || null}
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
                  {/* Add moduleAd in between PostCards */}
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
