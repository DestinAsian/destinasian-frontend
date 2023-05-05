import Link from 'next/link'

export default function ChildNavigation({ name, uri}) {
  return (
    <div className="px-2">
      <Link href={uri}>
        <a>
          <h2 className="px-2">{name}</h2>
        </a>
      </Link>
    </div>
  )
}

// import { useQuery } from '@apollo/client'
// import { useState } from 'react'
// import { gql } from '@apollo/client'

// export default function ChildNavigation(props) {
//   // const { loading, error, data } = useQuery(CATEGORIES_QUERY)

//   // if (loading) return <p>Loading...</p>
//   // if (error) return <p>Error :(</p>

//   const { categories } = props.data.nodeByUri

//   const [activeCategory, setActiveCategory] = useState(null)

//   const handleCategoryClick = (category) => {
//     setActiveCategory(category)
//   }

//   return (
//     <nav>
//       <ul>
//         {categories.map((category) => (
//           <li
//             key={category.id}
//             className={activeCategory === category ? 'active' : ''}
//             onClick={() => handleCategoryClick(category)}
//           >
//             <a href={`/category/${category.slug}`}>{category.name}</a>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   )
// }

// ChildNavigation.query = gql`
// query GetCategoryNavigation($uri: String!) {
//   nodeByUri(uri: $uri) {
//     ... on Category {
//       id
//       name
//       slug
//       parent {
//         node {
//           children {
//             edges {
//               node {
//                 name
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }
// `

// ChildNavigation.variables = ({uri}) => {
//   return {
//     uri,
//   }
// }


