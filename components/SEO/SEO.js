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

        {/* <script
          async
          src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.googletag = window.googletag || {cmd: []};
              googletag.cmd.push(function() {
                googletag.defineSlot('/34877012/DA_Module_Ad_1', [300, 250], 'div-gpt-ad-1687504295147-0').addService(googletag.pubads());
                googletag.defineSlot('/34877012/DA_Module_Ad_2', [300, 250], 'div-gpt-ad-1687504934896-0').addService(googletag.pubads());
                googletag.defineSlot('/34877012/DA_Module_Ad_3', [300, 250], 'div-gpt-ad-1687505544870-0').addService(googletag.pubads());
                googletag.defineSlot('/34877012/DA_Module_Ad_4', [300, 250], 'div-gpt-ad-1687505709352-0').addService(googletag.pubads());
                googletag.pubads().enableSingleRequest();
                googletag.pubads().collapseEmptyDivs();
                googletag.enableServices();
              });
            `,
          }}
        ></script> */}
      </Head>
    </>
  )
}
