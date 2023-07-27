import { gql } from '@apollo/client'
import classNames from 'classnames/bind'
import styles from './ModuleAd.module.scss'

// import banner1 from '../../assets/images/BannerAd_FourSeasonsKyoto.jpg'
// import banner2 from '../../assets/images/Banner Blank_2.jpg'
// import banner3 from '../../assets/images/Banner Blank_3.jpg'
// import banner4 from '../../assets/images/Banner Blank_4.jpg'

let cx = classNames.bind(styles)

export default function ModuleAd({
  bannerAd1,
  bannerAd2,
  bannerAd3,
  bannerAd4,
}) {
  return (
    <div className={cx('component')}>
      {bannerAd1 && (
        <div className={cx('ad-container')}>
          {/* <div
            className={cx('ad-content')}
            dangerouslySetInnerHTML={{ __html: bannerAd1 }}
          ></div> */}
          {/* Google Ad Manager Module Ad 1 */}
          <div
            className={cx('ad-content')}
            dangerouslySetInnerHTML={{
              __html: `
              <!-- /34877012/DA_Module_Ad_1 -->
              <div id='div-gpt-ad-1690435753500-0'>
                <script>
                  googletag.cmd.push(function() { googletag.display('div-gpt-ad-1690435753500-0'); });
                </script>
              </div>
              `,
            }}
          />
        </div>
      )}
      {bannerAd2 && (
        <div className={cx('ad-container')}>
          <div
            className={cx('ad-content')}
            dangerouslySetInnerHTML={{ __html: bannerAd2 }}
          ></div>
        </div>
      )}
      {bannerAd3 && (
        <div className={cx('ad-container')}>
          <div
            className={cx('ad-content')}
            dangerouslySetInnerHTML={{ __html: bannerAd3 }}
          ></div>
        </div>
      )}
      {bannerAd4 && (
        <div className={cx('ad-container')}>
          <div
            className={cx('ad-content')}
            dangerouslySetInnerHTML={{ __html: bannerAd4 }}
          ></div>
        </div>
      )}
      <div className={cx('border-bottom')}></div>

      {/* {ModuleAd4 && (
        <div className={cx('ad-container')}>
          <img className={cx('ad-content')} src={banners[3].content}></img>
        </div>
      )}

      {/* Google Ad Manager Module Ad 3 */}
      {/* <div className={cx('ad-container')}>
        <div
          className={cx('ad-content')}
          dangerouslySetInnerHTML={{
            __html: `<!-- /34877012/DA_Module_Ad_3 -->
          <div id='div-gpt-ad-1687505544870-0' style='min-width: 300px; min-height: 250px;'>
            <script>
              googletag.cmd.push(function() { googletag.display('div-gpt-ad-1687505544870-0'); });
            </script>
          </div>`,
          }}
        />
      </div> */}

      {/* Google Ad Manager Module Ad 4 */}
      {/* <div className={cx('ad-container')}>
        <div
          className={cx('ad-content')}
          dangerouslySetInnerHTML={{
            __html: `<!-- /34877012/DA_Module_Ad_4 -->
          <div id='div-gpt-ad-1687505709352-0' style='min-width: 300px; min-height: 250px;'>
            <script>
              googletag.cmd.push(function() { googletag.display('div-gpt-ad-1687505709352-0'); });
            </script>
          </div>`,
          }}
        />
      </div> */}
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
