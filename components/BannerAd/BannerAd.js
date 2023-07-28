import classNames from 'classnames/bind'
import styles from './BannerAd.module.scss'

let cx = classNames.bind(styles)

export default function BannerAd() {
  return (
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
  )
}
