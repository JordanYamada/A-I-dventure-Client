import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reactRefresh from '@vitejs/plugin-react-refresh';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define Vite configuration
export default defineConfig({
  plugins: [react(), reactRefresh()],
});
