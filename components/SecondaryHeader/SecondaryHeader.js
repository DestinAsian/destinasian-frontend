import React, { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './SecondaryHeader.module.scss'
import { Container } from '../../components'

let cx = classNames.bind(styles)

export default function SecondaryHeader({
  parent,
  children,
  categories,
  categoryUri,
}) {
  const [currentUrl, setCurrentUrl] = useState('')
  const [categoryUrl, setCategoryUrl] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [prevScrollY, setPrevScrollY] = useState(0)

  // Add currentUrl function
  useEffect(() => {
    setCurrentUrl(window.location.pathname)
  }, [])
  function isActive(uri) {
    return (currentUrl + "/") === uri
  }

  // Add currentCategoryUrl function
  useEffect(() => {
    setCategoryUrl(categoryUri)
  }, [])
  function isActiveCategory(uri) {
    return categoryUrl === uri
  }

  // Show sticky header when scroll down, Hide it when scroll up
  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 30 && currentScrollY < prevScrollY)
      setPrevScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScrollY])

  return (
    // <nav className={cx('sticky-header', { 'sticky-header-hidden': (!isScrolled && prevScrollY!=0) })}>
    <nav className={cx('component', { sticky: isScrolled })}>
      <Container>
        <div className={cx('navbar')}>

          {/* Single post navigation */}
          {categories != undefined ? (
            <div className={cx('navigation-wrapper')}>
              {categories.node.children.edges.map((post) => (
                <li key={post.node.uri} className={cx('single-nav-link')}>
                  <a
                    href={post.node.uri}
                    className={cx(
                      isActiveCategory(post.node.uri) ? 'active' : '',
                    )}
                  >
                    <h2 className={cx('nav-name')}>{post.node.name}</h2>
                  </a>
                </li>
              ))}
            </div>
          ) : null}

          {/* Parent category navigation */}
          {parent != null || parent != undefined ? (
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

          {/* Children category navigation */}
          {children != null || children != undefined ? (
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
        </div>
      </Container>
    </nav>
  )
}