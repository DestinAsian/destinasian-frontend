import { gql } from '@apollo/client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './SecondaryHeader.module.scss'

let cx = classNames.bind(styles)

export default function SecondaryHeader({ parent, children }) {
  const [currentUrl, setCurrentUrl] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)

  // Add currentUrl function
  useEffect(() => {
    setCurrentUrl(window.location.pathname)
  }, [])
  function isActive(uri) {
    return currentUrl === uri
  }

  // Add sticky header on scroll
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav className={cx('components', { sticky: isScrolled })}>
      <div className={cx('navbar', isScrolled ? 'navbar--scrolled' : '')}>
        {/* Children category navigation */}
        {children != null ? (
          <ul className={cx('nav-list')}>
            <div className="flex justify-center gap-x-4	">
              {children.edges.map((post) => (
                <li key={post.node.uri} className={cx('nav-link')}>
                  <a
                    href={post.node.uri}
                    className={cx(isActive(post.node.uri) ? 'active' : '')}
                  >
                    <h2 className={cx('nav-name')}>{post.node.name}</h2>
                  </a>
                </li>
              ))}
            </div>
          </ul>
        ) : null}

        {/* Parent category navigation */}
        {parent != null ? (
          <ul className={cx('nav-list')}>
            <div className="flex justify-center gap-x-4	">
              {parent.node.children.edges.map((post) => (
                <li key={post.node.uri} className={cx('nav-link')}>
                  <a
                    href={post.node.uri}
                    className={cx(isActive(post.node.uri) ? 'active' : '')}
                  >
                    <h2 className={cx('nav-name')}>{post.node.name}</h2>
                  </a>
                </li>
              ))}
            </div>
          </ul>
        ) : null}
      </div>
    </nav>
  )
}
