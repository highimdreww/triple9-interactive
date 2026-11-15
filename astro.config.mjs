import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://highimdreww.github.io',
  base: '/triple9-interactive',
  output: 'static',
  trailingSlash: 'always',
  integrations: [tailwind({ applyBaseStyles: false })],
  build: { format: 'directory' }
});
