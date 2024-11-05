import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/main.jsx', // Use main.jsx as the entry point
      name: 'VijayaFrontend', // Global variable name for UMD build
      formats: ['es', 'cjs', 'umd'], // Output formats for compatibility
      fileName: (format) => `vijaya-frontend.${format}.js`, // Output filenames
    },
    rollupOptions: {
      external: ['react', 'react-dom'], // Externalize dependencies
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
