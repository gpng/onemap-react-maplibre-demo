import type { AppProps } from "next/app";

import "maplibre-gl/dist/maplibre-gl.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <style global jsx>{`
        body {
          margin: 0;
        }
      `}</style>
    </>
  );
}

export default MyApp;
