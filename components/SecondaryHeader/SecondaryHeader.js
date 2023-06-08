import React, { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './SecondaryHeader.module.scss'
import { Container } from '../../components'

let cx = classNames.bind(styles)

export default function SecondaryHeader({ parent, children, uri }) {
  const [currentUrl, setCurrentUrl] = useState('')
  const [categoryUrl, setCategoryUrl] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [prevScrollY, setPrevScrollY] = useState(0)

  // Add currentUrl function
  useEffect(() => {
    setCurrentUrl(window.location.pathname)
  }, [])
  function isActive(uri) {
    return currentUrl === uri
  }

  // Add currentCategoryUrl function
  useEffect(() => {
    setCategoryUrl(uri)
  }, [])
  function isActiveCategory(uri) {
    return uri === uri
  }

  // Add sticky header on scroll
  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 0 && currentScrollY > prevScrollY)
      setPrevScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScrollY])

  console.log(parent)

  return (
    // <nav className={cx('sticky-header', { 'sticky-header-hidden': (!isScrolled && prevScrollY!=0) })}>
    <nav className={cx('component', { sticky: isScrolled })}>
      <Container>
        <div className={cx('navbar')}>

          {/* Children category navigation */}
          {children != null ? (
            <div className={cx('navigation-wrapper')}>
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
          ) : null}

          {/* Parent category navigation */}
          {parent != null ? (
            <div className={cx('navigation-wrapper')}>
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
          ) : null}
        </div>
      </Container>
    </nav>
  )
}
