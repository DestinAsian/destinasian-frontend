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
    <div className={cx('component', isComponentHidden ? 'hide-component' : '')}>
      <div className={cx('banner-wrapper')}>
        <div className={cx('ad-container')}>
          <div
            className={cx('ad-content')}
            dangerouslySetInnerHTML={{
              __html: `<!-- Banner1 [javascript] -->
            <script type="text/javascript">
            var rnd = window.rnd || Math.floor(Math.random()*10e6);
            var pid624644 = window.pid624644 || rnd;
            var plc624644 = window.plc624644 || 0;
            var abkw = window.abkw || '';
            var absrc = 'https://servedbyadbutler.com/adserve/;ID=185947;size=0x0;setID=624644;type=js;sw='+screen.width+';sh='+screen.height+';spr='+window.devicePixelRatio+';kw='+abkw+';pid='+pid624644+';place='+(plc624644++)+';rnd='+rnd+';click=CLICK_MACRO_PLACEHOLDER';
            document.write('<scr'+'ipt src="'+absrc+'" type="text/javascript"></scr'+'ipt>');
            </script>`,
            }}
          ></div>
        </div>

        <div className={cx('border-bottom')}></div>
      </div>
      {/* <BannerAd bannerAd={bannerAd2} />
      <BannerAd bannerAd={bannerAd3} />
      <BannerAd bannerAd={bannerAd4} /> */}
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
