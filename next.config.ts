import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Ignora erros de TypeScript durante o build
  typescript: {
    ignoreBuildErrors: true,
  },
  // ✅ Ignora erros de ESLint durante o build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // ✅ Configurações experimentais
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // ✅ Configurações de otimização
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
