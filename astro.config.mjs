// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://TadeooA.github.io',
  base: '/astroAgoramy',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
