self.addEventListener("install", e => {
  e.waitUntil(caches.open("static").then(cache => {
    return cache.addAll([
      "./index.html",
      "./index.css",
      "./index.js",
      "./level.html",
      "./level.js",
      "./game.html?difficulty=10",
      "./game.html?difficulty=15",
      "./game.html?difficulty=25",
      "./game.html?difficulty=",
      "./login.css",
      "./manifest.json",
      "./login.js",
      "./add.js",
      "./android.png",
      "./images/easy.png",
      "./images/extreme.png",
      "./images/hard.png",
      "./images/medium.png",
      "./maze.gif",
      "./maze.png",
      "./pacman.png",
      "./rat.png",
      "./hole.jpg",
      "./background.gif",
      "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css",
      "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js",
      "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css",
      "https://www.gstatic.com/firebasejs/4.8.1/firebase.js",
      "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",
      "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap",
      "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/jquery.touchswipe/1.6.18/jquery.touchSwipe.min.js"]);
  })

  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});