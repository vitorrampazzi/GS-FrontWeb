/** @type {import('next').NextConfig} */
const nextConfig = {
  // Adicione este bloco 'images'
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        port: '',
        pathname: '/**', // Isso permite qualquer imagem desse site
      },
    ],
  },
};

export default nextConfig;