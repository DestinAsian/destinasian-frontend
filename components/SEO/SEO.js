import Head from 'next/head'

/**
 * Provide SEO related meta tags to a page.
 *
 * @param {Props} props The props object.
 * @param {string} props.title Used for the page title, og:title, twitter:title, etc.
 * @param {string} props.description Used for the meta description, og:description, twitter:description, etc.
 * @param {string} props.imageUrl Used for the og:image and twitter:image. NOTE: Must be an absolute url.
 * @param {string} props.url Used for the og:url and twitter:url.
 *
 * @returns {React.ReactElement} The SEO component
 */
export default function SEO({ title, description, imageUrl, url }) {
  if (!title && !description && !imageUrl && !url) {
    return null
  }

  return (
    <>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, user-scalable=no" />

        {title && (
          <>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta property="og:title" content={title} />
            <meta property="twitter:title" content={title} />
          </>
        )}

        {description && (
          <>
            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
            <meta property="twitter:description" content={description} />
          </>
        )}

        {imageUrl && (
          <>
            <meta property="og:image" content={imageUrl} />
            <meta property="twitter:image" content={imageUrl} />
          </>
        )}

        {url && (
          <>
            <meta property="og:url" content={url} />
            <meta property="twitter:url" content={url} />
          </>
        )}

        {/* Typography Cloud */}
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cloud.typography.com/7429004/7933832/css/fonts.css"
        />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />

        {/* Google Ad Manager Module Ad */}
        <script
          async
          src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            if (!window.AdButlerHB){(function(){var s = document.createElement("script");s.async = true; s.type = "text/javascript";s.src = 'https://servedbyadbutler.com/hb_app.js';var n = document.getElementsByTagName("script")[0]; n.parentNode.insertBefore(s, n);}());}
            var AdButlerHB = AdButlerHB || {}; AdButlerHB.cmd = AdButlerHB.cmd || [];
            AdButlerHB.timeout = 700;
            AdButlerHB.cmd.push(function(){

            /* === ZONE ENTRIES GO HERE === */
            AdButlerHB.registerAuction('abhb_70934_1', [[0,0]],624644, 185947, "servedbyadbutler.com");
            AdButlerHB.registerAuction('abhb_70769_1', [[0,0]],624645, 185947, "servedbyadbutler.com");
            AdButlerHB.registerAuction('abhb_36282_1', [[0,0]],624646, 185947, "servedbyadbutler.com");
            AdButlerHB.registerAuction('abhb_14394_1', [[0,0]],624647, 185947, "servedbyadbutler.com");

            AdButlerHB.requestAuctions();
            });
            `,
          }}
        ></script>
      </Head>
    </>
  )
}
