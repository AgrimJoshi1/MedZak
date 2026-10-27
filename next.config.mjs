/** Static export: `npm run build` writes a plain-HTML site to ./out, deployable to any static host
 *  (the forms keep posting to https://medzak.co/esend.php). */
const nextConfig = {
  output: 'export',
  trailingSlash: true,          // /about-us/ -> out/about-us/index.html
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
