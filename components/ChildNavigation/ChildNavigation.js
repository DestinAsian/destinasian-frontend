import Link from 'next/link'
import React, { useState, useEffect } from 'react'

export default function ChildNavigation({ name, uri }) {
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    setCurrentUrl(window.location.pathname)
  }, [])

  function isActive(uri) {
    return currentUrl === uri
  }

  return (
    <div className="px-2">
      <Link href={uri}>
        <a
          className={`nav-link ${
            isActive(uri) ? 'text-[#f94700]' : ''
          }`}
        >
          <h2 className="px-2">{name}</h2>
        </a>
      </Link>
    </div>
  )
}
