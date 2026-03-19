const CACHE_NAME = 'talmid-medio-v1';

// Lista de ativos para cache inicial
const ASSETS = [
  './',               // Essencial para validar o start_url: "./"
  './index.html',
  './1.html',
  './2.html',
  './3.html',
  './4.html',
  './5.html',
  './6.html',
  './7.html',
  './8.html',
   './9.html',
   './10.html'
   './prateleira.html'
  './logo-192.png',
  './logo-512.png',
  './1-img.png',
  './2-img.png',
  './3-img.png',
  './4-img.png',
  './5-img.png',
  './6-img.png',
  './7-img.png',
  './8-img.png',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Alef:wght@400;700&display=swap'
];

// Instalação: Salva os arquivos no cache do navegador
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Talmid: Arquivos validados e cacheados');
      return cache.addAll(ASSETS);
    })
  );
});

// Ativação: Remove versões antigas do cache para evitar conflitos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Estratégia de Busca: Tenta o Cache primeiro, se não tiver, busca na rede
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
