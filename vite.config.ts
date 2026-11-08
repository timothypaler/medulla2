import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath} from 'node:url';

export default defineConfig({
 root:fileURLToPath(new URL('./src',import.meta.url)),
 publicDir:fileURLToPath(new URL('./public',import.meta.url)),
 base:'./',
 plugins:[react()],
 define:{'process.env.NODE_ENV':JSON.stringify('production')},
 server:{allowedHosts:['terminal.local']},
 build:{
  outDir:fileURLToPath(new URL('./dist',import.meta.url)),
  emptyOutDir:true,
  cssCodeSplit:false,
  lib:{
   entry:fileURLToPath(new URL('./src/main.tsx',import.meta.url)),
   name:'MedullaApp',formats:['iife'],
   fileName:()=> 'medulla-app.js',cssFileName:'medulla'
  }
 }
});
