// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

/**
 * /registro (alta de negocio con código por correo) todavía NO se publica.
 * La página vive fuera de src/pages y sólo se agrega en `npm run dev` o al
 * compilar con REGISTRO_PUBLICO=true. Para publicarla: poner la variable en
 * el build de deploy.yml (o mover el archivo a src/pages) y apuntar los CTA
 * «Comenzar Ahora» de src/components/Pricing/plans.ts a /registro.
 * @returns {import('astro').AstroIntegration}
 */
const registroOculto = () => ({
  name: 'registro-oculto',
  hooks: {
    'astro:config:setup': ({ command, injectRoute }) => {
      if (command === 'dev' || process.env.REGISTRO_PUBLICO === 'true') {
        injectRoute({ pattern: '/registro', entrypoint: './src/routes/registro.astro' });
      }
    },
  },
});

// https://astro.build/config
export default defineConfig({
  site: 'https://agoramy.com',
  base: '',
  trailingSlash: 'ignore',
  build: {
    assets: '_astro'
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    registroOculto(),
  ],
});
