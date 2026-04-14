import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import rehypeShiki from '@shikijs/rehype';

const nextConfig: NextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [
      [
        rehypeShiki,
        {
          theme: 'vitesse-dark',
        },
      ],
    ],
  },
});

// Wrap the config with the MDX provider
export default withMDX(nextConfig);