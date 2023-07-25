import classNames from 'classnames/bind'
import styles from './ModuleAd.module.scss'

import banner1 from '../../assets/images/BannerAd_FourSeasonsKyoto.jpg'
import banner2 from '../../assets/images/Banner Blank_2.jpg'
import banner3 from '../../assets/images/Banner Blank_3.jpg'
import banner4 from '../../assets/images/Banner Blank_4.jpg'

let cx = classNames.bind(styles)

export default function ModuleAd({
  moduleAd1,
  moduleAd2,
  moduleAd3,
  moduleAd4,
}) {
  const banners = [
    {
      src: banner1.src,
    },
    {
      src: banner2.src,
    },
    {
      src: banner3.src,
    },
    {
      src: banner4.src,
    },
  ]

  return (
    <div className={cx('component')}>
      {moduleAd1 && (
        <div className={cx('ad-container')}>
          {/* <img className={cx('ad-content')} src={banners[0].src}></img> */}
          {/* Google Ad Manager Module Ad 2 */}
          <div
            className={cx('ad-content')}
            dangerouslySetInnerHTML={{
              __html: `
              <div id="div-gpt-ad-1">
                <!-- /34877012/DA_Module_Ad_2 -->
                <div id='div-gpt-ad-1690269614970-0' style='min-width: 300px; min-height: 250px;'>
                  <script>
                    googletag.cmd.push(function() { 
                      googletag.display('div-gpt-ad-1690269614970-0'); 
                    });
                  </script>
                </div>
              </div>
              `,
            }}
          />

          {/* <div
            className={cx('tablet-ad-content')}
            dangerouslySetInnerHTML={{
              __html: `<!-- /34877012/DA_Module_Ad_2 -->
              <div id='div-gpt-ad-1690266923453-0' style='min-width: 300px; min-height: 250px;'>
                <script>
                  googletag.cmd.push(function() { googletag.display('div-gpt-ad-1690266923453-0'); });
                </script>
              </div>`,
            }}
          />

          <div
            className={cx('desktop-ad-content')}
            dangerouslySetInnerHTML={{
              __html: `<!-- /34877012/DA_Module_Ad_2 -->
              <div id='div-gpt-ad-1690266923453-0' style='min-width: 300px; min-height: 250px;'>
                <script>
                  googletag.cmd.push(function() { googletag.display('div-gpt-ad-1690266923453-0'); });
                </script>
              </div>`,
            }}
          /> */}
        </div>
      )}
      {moduleAd2 && (
        <div className={cx('ad-container')}>
          <img className={cx('ad-content')} src={banners[1].src}></img>
        </div>
      )}
      {moduleAd3 && (
        <div className={cx('ad-container')}>
          <img className={cx('ad-content')} src={banners[2].src}></img>
        </div>
      )}
      {moduleAd4 && (
        <div className={cx('ad-container')}>
          <img className={cx('ad-content')} src={banners[3].src}></img>
        </div>
      )}
      <div className={cx('border-bottom')}></div>

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
