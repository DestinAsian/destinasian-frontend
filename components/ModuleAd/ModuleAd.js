import classNames from 'classnames/bind'
import styles from './ModuleAd.module.scss'

let cx = classNames.bind(styles)

export default function ModuleAd({
  moduleAd1,
  moduleAd2,
  moduleAd3,
  moduleAd4,
}) {
  return (
    <div className={cx('component')}>
      {/* Google Ad Manager Module Ad 1 */}
      {/* <!-- /34877012/DA_Module_Ad_1 --> */}
      {/* {moduleAd1 && ( */}

      <div
        dangerouslySetInnerHTML={{
          __html: `<!-- /34877012/DA_Module_Ad_1 -->
              <div id='div-gpt-ad-1687504295147-0' style='min-width: 300px; min-height: 250px;'>
                <script>
                  googletag.cmd.push(function() { googletag.display('div-gpt-ad-1687504295147-0'); });
                </d>
              </div>`,
        }}
      />

      {/* Google Ad Manager Module Ad 2 */}
      {/* <!-- /34877012/DA_Module_Ad_2 --> */}
      {/* {moduleAd2 && ( */}
      <div
        dangerouslySetInnerHTML={{
          __html: `<!-- /34877012/DA_Module_Ad_2 -->
          <div id='div-gpt-ad-1687504934896-0' style='min-width: 300px; min-height: 250px;'>
            <script>
              googletag.cmd.push(function() { googletag.display('div-gpt-ad-1687504934896-0'); });
            </script>
          </div>`,
        }}
      />

      {/* Google Ad Manager Module Ad 3 */}
      {/* <!-- /34877012/DA_Module_Ad_3 --> */}
      {/* {moduleAd3 && ( */}

      <div
        dangerouslySetInnerHTML={{
          __html: `<!-- /34877012/DA_Module_Ad_3 -->
          <div id='div-gpt-ad-1687505544870-0' style='min-width: 300px; min-height: 250px;'>
            <script>
              googletag.cmd.push(function() { googletag.display('div-gpt-ad-1687505544870-0'); });
            </script>
          </div>`,
        }}
      />
      {/* )} */}

      {/* Google Ad Manager Module Ad 4 */}
      {/* <!-- /34877012/DA_Module_Ad_4 --> */}
      {/* {moduleAd4 && ( */}
      <div
        dangerouslySetInnerHTML={{
          __html: `<!-- /34877012/DA_Module_Ad_4 -->
          <div id='div-gpt-ad-1687505709352-0' style='min-width: 300px; min-height: 250px;'>
            <script>
              googletag.cmd.push(function() { googletag.display('div-gpt-ad-1687505709352-0'); });
            </script>
          </div>`,
        }}
      />
    </div>
  )
}
