import React from 'react'
import className from 'classnames/bind'
import styles from './FeatureWell.module.scss'
import Link from 'next/link'
import { Button } from '/components'

let cx = className.bind(styles)

export default function FeatureWell({ featureWell }) {
  return (
    <>
      {featureWell?.map((media, index) => (
        <div className={cx('component')} key={index}>
          <video src={media.videoSrc} loop autoPlay playsInline muted />
        </div>
      ))}
    </>
  )
}
