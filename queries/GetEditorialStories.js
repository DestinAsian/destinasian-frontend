import { gql } from '@apollo/client'

export const GetEditorialStories = gql`
  query GetEditorialStories($first: Int, $categoryName: String) {
    editorials(
      first: $first
      where: {
        status: PUBLISH
        orderby: { field: DATE, order: DESC }
        categoryName: $categoryName
      }
    ) {
      edges {
        node {
          title
          excerpt
          uri
          categories {
            edges {
              node {
                name
                uri
              }
            }
          }
          featuredImage {
            node {
              id
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
        }
      }
    }
  }
`
