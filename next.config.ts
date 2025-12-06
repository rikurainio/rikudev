import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import rehypePrettyCode from 'rehype-pretty-code';

const nextConfig: NextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: 'one-dark-pro', // You can change this to 'dracula', 'github-dark', etc.
          keepBackground: true,
        },
      ],
    ],
  },
});

// Wrap the config with the MDX provider
export default withMDX(nextConfig);