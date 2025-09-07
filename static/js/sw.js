// Service Worker básico
self.addEventListener('install', function(event) {
    console.log('Service Worker instalado');
});

self.addEventListener('fetch', function(event) {
    // Para evitar erro 404, simplesmente retorna a requisição
    event.respondWith(fetch(event.request));
});