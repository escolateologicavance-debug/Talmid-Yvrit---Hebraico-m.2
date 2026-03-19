const CACHE_NAME = 'talmid-medio-v2'; // Atualizei a versão para forçar o navegador a ler as mudanças

// Lista completa de ativos baseada no seu 1.html e na estrutura do projeto
const ASSETS = [
  './',               
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
  './10.html',
  './11.html',        
  './quiz.html',      
  './creditos.html',  
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
  './7-img.html',     
  './8-img.html',     
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Alef:wght@400;700&display=swap',
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap' // Fonte dos títulos
];

// Instalação: Salva os arquivos no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Talmid Yvrit: Cache atualizado com sucesso');
      return cache.addAll(ASSETS);
    })
  );
});

// Ativação: Limpa o cache antigo (v1) e assume a v2
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Estratégia: Cache primeiro, depois Rede
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
