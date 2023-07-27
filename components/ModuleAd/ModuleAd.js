import { gql } from '@apollo/client'
import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './ModuleAd.module.scss'
import { BannerAd } from '..'

let cx = classNames.bind(styles)

export default function ModuleAd({
  bannerAd1,
  bannerAd2,
  bannerAd3,
  bannerAd4,
}) {
  const [isComponentHidden, setIsComponentHidden] = useState(false)

  useEffect(() => {
    const componentElement = document.getElementsByClassName('component')
    if (componentElement.clientHeight < 50) {
      setIsComponentHidden(true)
    }
  }, [])

  return (
    <div
      className={cx('component', isComponentHidden ? 'hide-component' : '')}
    >
      <BannerAd bannerAd={bannerAd1} />
      <BannerAd bannerAd={bannerAd2} />
      <BannerAd bannerAd={bannerAd3} />
      <BannerAd bannerAd={bannerAd4} />
    </div>
  )
}

ModuleAd.fragments = {
  entry: gql`
    fragment ModuleAdFragment on RootQueryToBannerAdConnection {
      edges {
        node {
          content
          title
        }
      }
    }
  `,
}
