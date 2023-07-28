import { gql } from '@apollo/client'
import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './ModuleAd.module.scss'
import { BannerAd } from '..'

let cx = classNames.bind(styles)

export default function ModuleAd({
  // bannerAd,
  bannerAd2,
  bannerAd3,
  bannerAd4,
}) {
  return (
    <div className={cx('banner-wrapper')}>
      {/* {bannerAd && ( */}
        <div className={cx('ad-container')}>
          <div className={cx('ad-content')}>
            <img
              src="https://servedbyadbutler.com/convtrack.spark?MID=185947&zoneID=624644"
              width="1"
              height="1"
              border="0"
            />
          </div>
        </div>
      {/* )} */}
      <div className={cx('border-bottom')}></div>
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
