import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Agregamos la propiedad base y como valor ponemos el nombre de nuestro repositorio:
  base: "/",
  server: {
    host: "0.0.0.0",
  },
})
