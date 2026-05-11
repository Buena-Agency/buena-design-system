import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Showcase SPA build. Vercel deploys this. The entry is `index.html`
// at the repo root, which points to `src/showcase/main.tsx`.
export default defineConfig({
  plugins: [react()],
});
