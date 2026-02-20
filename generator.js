let isSerie = document.getElementById('serie');

let isMovie = document.getElementById('movie');



let types = document.querySelectorAll('input[type=radio][name=type]');



types.forEach(type => {

    type.addEventListener('change', () =>{

        if (type.value == "movie") {

            document.getElementById('season-selector').style.display = "none";

            document.getElementById('second-code').style.display = "none";

        } else if (type.value == "serie"){

            document.getElementById('second-code').style.display = "block";

            document.getElementById('season-selector').style.display = "block";

        }

    })

})





function convertMinutes(minutess){

    let hours = Math.floor(minutess / 60) ,

    minutes = Math.floor(minutess % 60),

    total = '';



    if (minutess < 60){

        total = `${minutes}m`

        return total

    } else if (minutess > 60){

      total = `${hours}h ${minutes}m`

      return total

    } else if (minutess = 60){

        total = `${hours}h`

        return total

    }

}





function generar() {

let serieKey = document.getElementById('numero').value;

let languaje = "es-MX"

let seasonNumber = document.getElementById('numeroTemporada').value;



const cargarPeliculas = async() => {



if (isSerie.checked) {

try {



const respuesta = await fetch(` https://api.themoviedb.org/3/tv/${serieKey}?api_key=1f098c7d68777348425d008055475b88&language=${languaje}`);

const respuesta3 = await fetch(`https://api.themoviedb.org/3/tv/${serieKey}/season/${seasonNumber}?api_key=1f098c7d68777348425d008055475b88&language=${languaje}`);



if (respuesta.status === 200) {

const datos = await respuesta.json();

const datosTemporada = await respuesta3.json();

console.log(datosTemporada);



let template = document.getElementById('html-final');

// HTML ENTRADAS DE SERIES (SIN TEMPORADAS)

let justHtml = ` <!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>${datos.name}</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css">
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700&family=Exo+2:wght@300;400;600&display=swap" rel="stylesheet">
<link href="https://vjs.zencdn.net/7.10.2/video-js.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<style>
:root {
--starfleet-blue: #0B5D9E;
--starfleet-gold: #FFC107;
--starfleet-red: #D22F27;
--starfleet-dark: #0A0F2D;
--starfleet-light: #74C0FC;
--starfleet-bg: #000718;
--text-primary: #E7E5E4;
--text-secondary: #A3A3A3;
--card-bg: rgba(13, 17, 42, 0.85);
--gradient-primary: linear-gradient(135deg, var(--starfleet-blue) 0%, var(--starfleet-dark) 100%);
--gradient-secondary: linear-gradient(135deg, var(--starfleet-gold) 0%, #B68500 100%);
}

* {
margin: 0;
padding: 0;
box-sizing: border-box;
-webkit-tap-highlight-color: transparent;
}

body, html {
height: 100%;
background-color: var(--starfleet-bg);
color: var(--text-primary);
font-family: 'Exo 2', sans-serif;
overflow-x: hidden;
background-image:
radial-gradient(circle at 15% 50%, rgba(11, 93, 158, 0.15) 0%, transparent 25%),
radial-gradient(circle at 85% 30%, rgba(255, 193, 7, 0.1) 0%, transparent 25%),
radial-gradient(circle at 50% 80%, rgba(210, 47, 39, 0.1) 0%, transparent 25%);
}

/* Header y navegación */
.header {
position: fixed;
top: 0;
left: 0;
width: 100%;
padding: 15px 20px;
display: flex;
justify-content: space-between;
align-items: center;
background: linear-gradient(to bottom, rgba(0, 7, 24, 0.95) 0%, transparent 100%);
z-index: 100;
transition: background 0.3s ease;
}

.header.scrolled {
background: rgba(10, 15, 45, 0.98);
backdrop-filter: blur(10px);
box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.nav-icon {
font-size: 24px;
color: var(--starfleet-light);
cursor: pointer;
transition: transform 0.2s;
}

.nav-icon:hover {
transform: scale(1.1);
}

.logo {
font-family: 'Orbitron', sans-serif;
font-weight: 700;
font-size: 18px;
color: var(--starfleet-light);
letter-spacing: 1px;
text-transform: uppercase;
}

.logo span {
color: var(--starfleet-gold);
}

/* Hero section */
.hero {
position: relative;
width: 100%;
height: 75vh;
overflow: hidden;
display: flex;
align-items: flex-end;
}

.hero-bg {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-image: url('https://image.tmdb.org/t/p/original/${datos.poster_path}');
background-size: cover;
background-position: center;
z-index: -1;
}

.hero-bg::after {
content: '';
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: linear-gradient(to top, var(--starfleet-bg) 5%, transparent 40%),
linear-gradient(to bottom, var(--starfleet-bg) 5%, transparent 20%),
linear-gradient(to right, var(--starfleet-bg) 5%, transparent 30%),
linear-gradient(to left, var(--starfleet-bg) 5%, transparent 30%);
}

.hero-content {
width: 100%;
padding: 20px;
display: flex;
gap: 20px;
z-index: 2;
}

.poster {
width: 140px;
height: 200px;
border-radius: 12px;
border: 2px solid var(--starfleet-gold);
box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
flex-shrink: 0;
object-fit: cover;
}

.hero-info {
flex: 1;
}

.hero-title {
font-family: 'Orbitron', sans-serif;
font-size: 24px;
margin-bottom: 5px;
color: white;
text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.hero-year {
color: var(--starfleet-light);
font-size: 16px;
margin-bottom: 15px;
}

.hero-actions {
display: flex;
gap: 10px;
margin-bottom: 15px;
}

.btn {
padding: 10px 15px;
border-radius: 8px;
font-weight: 600;
font-size: 14px;
display: flex;
align-items: center;
gap: 5px;
cursor: pointer;
transition: all 0.2s ease;
border: none;
}

.btn-primary {
background: var(--gradient-primary);
color: white;
}

.btn-primary:hover {
transform: translateY(-2px);
box-shadow: 0 5px 15px rgba(11, 93, 158, 0.4);
}

.btn-secondary {
background: var(--card-bg);
color: var(--text-primary);
border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-secondary:hover {
background: rgba(255, 255, 255, 0.05);
}

.hero-rating {
display: flex;
align-items: center;
gap: 5px;
font-size: 14px;
color: var(--starfleet-gold);
}

/* Contenido principal */
.main-content {
padding: 20px;
}

.info-badges {
display: flex;
flex-wrap: wrap;
gap: 10px;
margin-bottom: 20px;
}

.badge {
padding: 6px 12px;
background: var(--card-bg);
border-radius: 20px;
font-size: 12px;
border: 1px solid rgba(255, 255, 255, 0.1);
display: flex;
align-items: center;
gap: 5px;
}

.badge i {
color: var(--starfleet-light);
}

.synopsis {
margin-bottom: 25px;
line-height: 1.6;
color: var(--text-primary);
}

.section-title {
font-family: 'Orbitron', sans-serif;
font-size: 20px;
margin-bottom: 15px;
color: var(--starfleet-light);
position: relative;
padding-left: 15px;
}

.section-title::before {
content: '';
position: absolute;
left: 0;
top: 50%;
transform: translateY(-50%);
height: 70%;
width: 4px;
background: var(--gradient-primary);
border-radius: 2px;
}

/* Selector de temporadas */
.season-selector {
margin-bottom: 20px;
position: relative;
}

.season-dropdown {
background: var(--card-bg);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 8px;
padding: 12px 15px;
width: 100%;
color: var(--text-primary);
font-family: 'Exo 2', sans-serif;
font-size: 16px;
cursor: pointer;
appearance: none;
background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2374C0FC' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
background-repeat: no-repeat;
background-position: right 15px center;
background-size: 16px;
}

.season-dropdown:focus {
outline: none;
border-color: var(--starfleet-light);
}

/* Lista de episodios */
.episodes-list {
display: none;
margin-bottom: 30px;
}

.episodes-list.active {
display: block;
}

.episode-item {
position: relative;
border-radius: 12px;
margin-bottom: 20px;
overflow: hidden;
transition: transform 0.3s, box-shadow 0.3s;
height: 180px;
border: 1px solid rgba(255, 255, 255, 0.1);
cursor: pointer;
}

.episode-item:hover {
transform: translateY(-5px);
box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
}

.episode-item.watched {
opacity: 0.8;
border-color: var(--starfleet-gold);
}

.episode-bg {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-size: cover;
background-position: center;
z-index: 1;
transition: transform 0.5s ease;
}

.episode-item:hover .episode-bg {
transform: scale(1.05);
}

.episode-bg::after {
content: '';
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: linear-gradient(to right, rgba(10, 15, 45, 0.9) 0%, rgba(10, 15, 45, 0.7) 50%, transparent 100%);
}

.episode-content {
position: relative;
z-index: 2;
padding: 20px;
height: 100%;
display: flex;
flex-direction: column;
justify-content: space-between;
}

.episode-header {
display: flex;
justify-content: space-between;
align-items: flex-start;
margin-bottom: 10px;
}

.episode-number {
font-family: 'Orbitron', sans-serif;
font-size: 24px;
color: var(--starfleet-light);
background: rgba(0, 0, 0, 0.6);
padding: 5px 12px;
border-radius: 20px;
}

.episode-duration {
font-size: 14px;
color: var(--starfleet-gold);
display: flex;
align-items: center;
gap: 5px;
background: rgba(0, 0, 0, 0.6);
padding: 5px 10px;
border-radius: 15px;
}

.episode-info {
flex: 1;
display: flex;
flex-direction: column;
justify-content: center;
}

.episode-title {
font-size: 18px;
font-weight: 700;
margin-bottom: 8px;
text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
}

.episode-description {
font-size: 14px;
color: var(--text-primary);
line-height: 1.4;
margin-bottom: 15px;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
overflow: hidden;
text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
}

.episode-footer {
display: flex;
justify-content: space-between;
align-items: center;
}

.episode-rating {
display: flex;
align-items: center;
gap: 5px;
font-size: 14px;
color: var(--starfleet-gold);
}

.progress-bar-container {
position: absolute;
bottom: 0;
left: 0;
width: 100%;
height: 4px;
background: rgba(255, 255, 255, 0.2);
z-index: 3;
}

.progress-bar {
height: 100%;
background: var(--starfleet-gold);
width: 0%;
transition: width 0.3s ease;
}

.play-episode {
background: var(--gradient-primary);
border: none;
border-radius: 50%;
width: 50px;
height: 50px;
display: flex;
align-items: center;
justify-content: center;
color: white;
cursor: pointer;
transition: all 0.3s;
box-shadow: 0 5px 15px rgba(11, 93, 158, 0.4);
position: relative;
z-index: 4;
}

.play-episode:hover {
background: var(--gradient-secondary);
transform: scale(1.1);
}

/* Lightbox para el reproductor */
.lightbox {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: #000;
display: flex;
justify-content: center;
align-items: center;
z-index: 1000;
opacity: 0;
visibility: hidden;
transition: opacity 0.3s, visibility 0.3s;
}

.lightbox.active {
opacity: 1;
visibility: visible;
}

.lightbox-content {
width: 100%;
height: 100%;
position: relative;
}

.video-container {
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
background: #000;
}

.video-js {
width: 100%;
height: 100%;
background: #000;
}

/* Estilos para el título del episodio - MODIFICADO */
.vjs-title {
position: absolute;
top: 80px;
left: 50%;
transform: translateX(-50%);
color: white;
font-size: 16px;
font-weight: 500;
text-shadow: 0 2px 4px rgba(0,0,0,0.7);
background: rgba(0,0,0,0.5);
padding: 6px 16px;
border-radius: 30px;
border: 1px solid var(--starfleet-gold);
z-index: 1001;
backdrop-filter: blur(4px);
white-space: nowrap;
max-width: 80%;
overflow: hidden;
text-overflow: ellipsis;
transition: opacity 0.3s ease, visibility 0.3s ease;
}

.vjs-title.hidden {
opacity: 0;
visibility: hidden;
pointer-events: none;
}

/* Controles personalizados del reproductor */
.vjs-custom-controls {
position: absolute;
bottom: 30px;
left: 0;
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
z-index: 1001;
pointer-events: none;
gap: 15px;
transition: opacity 0.3s ease;
}

.vjs-custom-controls button {
pointer-events: auto;
}

/* Controles principales en el centro */
.vjs-main-controls {
display: flex;
align-items: center;
justify-content: center;
gap: 25px;
margin-bottom: 5px;
}

.vjs-main-controls .vjs-custom-button {
background: rgba(0, 0, 0, 0.6);
border: 1.5px solid var(--starfleet-gold);
color: white;
width: 55px;
height: 55px;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
transition: all 0.2s;
backdrop-filter: blur(4px);
}

.vjs-main-controls .vjs-custom-button:hover {
transform: scale(1.05);
background: var(--gradient-primary);
border-width: 2px;
}

.vjs-main-controls .material-icons {
font-size: 32px;
}

/* Controles de navegación inferior */
.vjs-nav-controls {
display: flex;
align-items: center;
justify-content: center;
gap: 10px;
flex-wrap: wrap;
}

.vjs-nav-controls .vjs-custom-button {
background: rgba(0, 0, 0, 0.6);
border: 1.5px solid var(--starfleet-light);
color: white;
padding: 8px 18px;
border-radius: 30px;
display: flex;
align-items: center;
gap: 6px;
cursor: pointer;
transition: all 0.2s;
font-size: 14px;
backdrop-filter: blur(4px);
}

.vjs-nav-controls .vjs-custom-button:hover {
background: var(--gradient-primary);
border-color: var(--starfleet-gold);
}

.vjs-nav-controls .material-icons {
font-size: 20px;
}

/* Botón de ajuste de pantalla */
.vjs-screen-adjust-button {
position: absolute;
top: 20px;
right: 20px;
width: 44px;
height: 44px;
border-radius: 50%;
background: rgba(0, 0, 0, 0.6);
border: 1.5px solid var(--starfleet-light);
color: white;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
z-index: 1002;
transition: all 0.2s;
backdrop-filter: blur(4px);
transition: opacity 0.3s ease;
}

.vjs-screen-adjust-button:hover {
transform: scale(1.05);
border-color: var(--starfleet-gold);
background: rgba(0, 0, 0, 0.8);
}

.vjs-screen-adjust-button .material-icons {
font-size: 24px;
}

/* Botón de regreso */
.vjs-back-button {
position: absolute;
top: 20px;
left: 20px;
width: 44px;
height: 44px;
border-radius: 50%;
background: rgba(0, 0, 0, 0.6);
border: 1.5px solid var(--starfleet-light);
color: white;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
z-index: 1002;
transition: all 0.2s;
backdrop-filter: blur(4px);
transition: opacity 0.3s ease;
}

.vjs-back-button:hover {
transform: scale(1.05);
border-color: var(--starfleet-gold);
}

.vjs-back-button .material-icons {
font-size: 24px;
}

/* Overlay oscuro */
.vjs-dark-overlay {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgba(0, 0, 0, 0.5);
opacity: 0;
transition: opacity 0.3s;
pointer-events: none;
z-index: 999;
}

/* Botón de siguiente episodio automático */
.vjs-next-episode {
position: absolute;
bottom: 120px;
right: 20px;
background: var(--gradient-primary);
color: white;
border: none;
padding: 12px 24px;
border-radius: 40px;
font-size: 14px;
font-weight: 600;
cursor: pointer;
z-index: 1002;
box-shadow: 0 5px 20px rgba(0,0,0,0.5);
border: 1.5px solid var(--starfleet-gold);
animation: pulse 2s infinite;
}

@keyframes pulse {
0% { transform: scale(1); }
50% { transform: scale(1.03); }
100% { transform: scale(1); }
}

.vjs-adjustment-label {
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
background: rgba(0, 0, 0, 0.85);
color: white;
padding: 12px 24px;
border-radius: 40px;
font-size: 18px;
font-weight: 500;
z-index: 1003;
border: 1.5px solid var(--starfleet-gold);
backdrop-filter: blur(4px);
animation: fadeInOut 1.2s ease-in-out forwards;
white-space: nowrap;
}

@keyframes fadeInOut {
0% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
}

/* Loader y overlay */
.loader {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: var(--starfleet-bg);
z-index: 1000;
display: flex;
justify-content: center;
align-items: center;
transition: opacity 0.3s;
}

.loader::after {
content: '';
width: 50px;
height: 50px;
border: 5px solid var(--starfleet-light);
border-top-color: var(--starfleet-gold);
border-radius: 50%;
animation: spin 1s linear infinite;
}

@keyframes spin {
to { transform: rotate(360deg); }
}

.overlay {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: var(--starfleet-bg);
z-index: 999;
transition: opacity 0.5s;
}

.overlay.hidden {
opacity: 0;
pointer-events: none;
}

/* Footer */
.footer {
padding: 20px;
text-align: center;
color: var(--text-secondary);
font-size: 12px;
border-top: 1px solid rgba(255, 255, 255, 0.05);
}

/* Responsive ajustado */
@media (max-width: 768px) {
.hero {
height: 70vh;
}

.hero-content {
flex-direction: column;
align-items: center;
text-align: center;
}

.poster {
width: 120px;
height: 170px;
}

.hero-actions {
justify-content: center;
}

.episode-item {
height: 200px;
}

.episode-title {
font-size: 16px;
}

.episode-description {
font-size: 13px;
-webkit-line-clamp: 3;
}

.play-episode {
width: 45px;
height: 45px;
}

.vjs-main-controls {
gap: 20px;
}

.vjs-main-controls .vjs-custom-button {
width: 48px;
height: 48px;
}

.vjs-main-controls .material-icons {
font-size: 28px;
}

.vjs-nav-controls {
gap: 10px;
}

.vjs-nav-controls .vjs-custom-button {
padding: 6px 14px;
font-size: 13px;
}

.vjs-title {
font-size: 14px;
top: 70px;
}
}

@media (max-width: 480px) {
.hero-title {
font-size: 20px;
}

.btn {
padding: 8px 12px;
font-size: 12px;
}

.episode-item {
height: 220px;
}

.episode-bg::after {
background: linear-gradient(to bottom, rgba(10, 15, 45, 0.9) 0%, rgba(10, 15, 45, 0.7) 70%, transparent 100%);
}

.episode-content {
padding: 15px;
}

.episode-title {
font-size: 15px;
}

.episode-description {
-webkit-line-clamp: 2;
}
}
</style>
</head>
<body oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
<div id="loader" class="loader"></div>
<div class="overlay"></div>

<!-- Header -->
<header class="header" id="header">
<i class="fas fa-arrow-left nav-icon" id="back-button"></i>
<div class="logo">Dani<span>Max</span></div>
<i class="fas fa-flag nav-icon" id="flag-button"></i>
</header>

<!-- Hero Section -->
<section class="hero">
<div class="hero-bg"></div>
<div class="hero-content">
<img src="https://image.tmdb.org/t/p/w500/${datos.poster_path}" alt="${datos.name}" class="poster">
<div class="hero-info">
<h1 class="hero-title">${datos.name}</h1>
<p class="hero-year">(${datos.first_air_date.slice(0,4)}) - Serie de TV</p>
<div class="hero-rating">
<i class="fas fa-star"></i>
<span>${datos.vote_average}</span>
</div>
</div>
</div>
</section>

<!-- Main Content -->
<main class="main-content">
<div class="info-badges">
<div class="badge">
<i class="fas fa-tv"></i>${datos.number_of_seasons}
</div>
<div class="badge">
<i class="fas fa-film"></i>${datos.number_of_episodes}
</div>
<div class="badge">
<i class="fas fa-star"></i>${datos.genres.map(genre => genre.name).join(', ')}
</div>
</div>

<div class="synopsis">
<h2 class="section-title">Sinopsis</h2>
<p>${datos.overview}</div>

<!-- Selector de temporada -->
<div class="season-selector">
<h2 class="section-title">Temporadas</h2>
<select class="season-dropdown" id="season-selector">
<option value="season1">Temporada 1</option>
</select>
</div>

<!-- Temporada 1 - Episodios -->
<div class="episodes-list active" id="season1">
<h2 class="section-title">Temporada 1 - Episodios</h2>
<div id="episode-list"></div>
</div>
</main>

<!-- Lightbox para el reproductor -->
<div class="lightbox" id="player-lightbox">
<div class="lightbox-content">
<div class="video-container">
<video id="my-video" class="video-js vjs-default-skin" controls preload="auto">
<source src="" type="video/mp4">
<p class="vjs-no-js">Para ver este video, habilita JavaScript y considera actualizar a un navegador web que soporte video HTML5</p>
</video>
</div>
</div>
</div>

<!-- Footer -->
<footer class="footer">
<p>© 2025 Danimax Studios.</p>
</footer>

<script src="https://vjs.zencdn.net/7.10.2/video.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Dan1ax/Nv@8ad24fa1976609d195ae1bd9a84faa098626078d/hometv3.js"></script>
<script>
  // Playlist con los datos de los episodios
const playlist = {
    "seasons": [
        {
            "season_title": "Temporada 1",
            "episodes": [
                
            ]
        }
    ]
};

// Elementos DOM
const header = document.getElementById('header');
const backButton = document.getElementById('back-button');
const seasonSelector = document.getElementById('season-selector');
const episodeList = document.getElementById('episode-list');
const playerLightbox = document.getElementById('player-lightbox');

// Variables globales
let currentSeasonIndex = 0;
let currentEpisodeIndex = 0;
let currentTitleElement = null;
let countdownTimer;
let countdownTime = 20;
let isCountdownActive = false;

// Inicializar reproductor Video.js
const player = videojs('my-video', {
    controlBar: {
        playToggle: true,
        volumePanel: true,
        fullscreenToggle: true,
        pipToggle: true,
        progressControl: true,
        remainingTimeDisplay: true,
        currentTimeDisplay: true,
    },
    userActions: {
        doubleClick: true,
        hotkeys: true
    }
});</script>
</body>
</html>



`;

                    



let episodeList = '';

    

datosTemporada.episodes.forEach(episode => {



episodeList += `

{
  "title": "${episode.name}",
  "image": "https://media.themoviedb.org/t/p/w500_and_h282_face/${episode.still_path}",
  "video_url": "http://archive.org/download/vcautopistadoscreadacdo-199661007-996b-43d-5-beae-55e-7c-7b-53648-csze/1%20x%20(1)vctaskareelareddelcontrabandolatcreadacdo-199661007-996b-43d-5-beae-55e-7c-7b-53648-csze.mpv",
  "duration": "(${episode.runtime})min",
  "number": ${episode.episode_number},
  "rating": ${episode.vote_average}
},

`

})


let seasonsOption = '';

    

datos.seasons.forEach(season => {

if(season.name != ("Especiales" || "especiales" )){

seasonsOption += `


`

}

})



let seasonOnly = `

${episodeList}

`;

let temposTemplate = `${seasonOnly}


`;





const btnCopiar = document.getElementById('copiar');

template.innerText = justHtml;



let templateHTML = template.innerText;



let seasonFrame = document.getElementById('html-final-2');

let copiarTempos = document.getElementById('copiar2');



if (seasonNumber == 1){

    seasonFrame.innerText = temposTemplate;

} else if (seasonNumber > 1){

   seasonFrame.innerText = seasonOnly;

}





let genSeasonsCount;

    

if (datos.number_of_seasons == 1){

    genSeasonsCount = " Temporada"

} else if (datos.number_of_seasons > 1){

    genSeasonsCount = " Temporadas"

}





btnCopiar.addEventListener('click', () => {

    navigator.clipboard.writeText(templateHTML);

})



copiarTempos.addEventListener('click', () => {

    navigator.clipboard.writeText(seasonFrame.innerText);

})





let genPoster = document.getElementById('info-poster');

let genTitle = document.getElementById('info-title');

let genSeasons = document.getElementById('info-seasons');

let genYear = document.getElementById('info-year');



genPoster.setAttribute('src', `https://image.tmdb.org/t/p/w500/${datos.poster_path}`)

genTitle.innerText = datos.name;

genSeasons.innerText = datos.number_of_seasons + genSeasonsCount;

genYear.innerText = datos.first_air_date.slice(0,4);







} else if (respuesta.status === 401) {

console.log('Wrong key');

} else if (respuesta.status === 404) {

console.log('No existe');

}

    

} catch (error) {

console.log(error);

}

} 





else if(isMovie.checked){

try {



const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${serieKey}?api_key=1f098c7d68777348425d008055475b88&language=${languaje}`);



if (respuesta.status === 200) {

const datos = await respuesta.json();



let template = document.getElementById('html-final');

var datalink3 = document.getElementById("datalink3").value;
var link4 = document.getElementById("link4").value;
var link2 = document.getElementById("link2").value;
let justHtml = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>${datos.title}</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css">
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700&family=Exo+2:wght@300;400;600&display=swap" rel="stylesheet">
<style>
:root {
  --starfleet-blue: #0B5D9E;
  --starfleet-gold: #FFC107;
  --starfleet-red: #D22F27;
  --starfleet-dark: #0A0F2D;
  --starfleet-light: #74C0FC;
  --starfleet-bg: #000718;
  --text-primary: #E7E5E4;
  --text-secondary: #A3A3A3;
  --card-bg: rgba(13, 17, 42, 0.85);
  --gradient-primary: linear-gradient(135deg, var(--starfleet-blue) 0%, var(--starfleet-dark) 100%);
  --gradient-secondary: linear-gradient(135deg, var(--starfleet-gold) 0%, #B68500 100%);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

body, html {
  height: 100%;
  background-color: var(--starfleet-bg);
  color: var(--text-primary);
  font-family: 'Exo 2', sans-serif;
  overflow-x: hidden;
  background-image: 
    radial-gradient(circle at 15% 50%, rgba(11, 93, 158, 0.15) 0%, transparent 25%),
    radial-gradient(circle at 85% 30%, rgba(255, 193, 7, 0.1) 0%, transparent 25%),
    radial-gradient(circle at 50% 80%, rgba(210, 47, 39, 0.1) 0%, transparent 25%);
}

/* Header y navegación */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to bottom, rgba(0, 7, 24, 0.95) 0%, transparent 100%);
  z-index: 100;
  transition: background 0.3s ease;
}

.header.scrolled {
  background: rgba(10, 15, 45, 0.98);
  backdrop-filter: blur(10px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.nav-icon {
  font-size: 24px;
  color: var(--starfleet-light);
  cursor: pointer;
  transition: transform 0.2s;
}

.nav-icon:hover {
  transform: scale(1.1);
}

.logo {
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: var(--starfleet-light);
  letter-spacing: 1px;
  text-transform: uppercase;
}

.logo span {
  color: var(--starfleet-gold);
}

/* Hero section */
.hero {
  position: relative;
  width: 100%;
  height: 75vh;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://image.tmdb.org/t/p/original/${datos.poster_path}');
  background-size: cover;
  background-position: center;
  z-index: -1;
}

.hero-bg::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, var(--starfleet-bg) 5%, transparent 40%),
              linear-gradient(to bottom, var(--starfleet-bg) 5%, transparent 20%),
              linear-gradient(to right, var(--starfleet-bg) 5%, transparent 30%),
              linear-gradient(to left, var(--starfleet-bg) 5%, transparent 30%);
}

.hero-content {
  width: 100%;
  padding: 20px;
  display: flex;
  gap: 20px;
  z-index: 2;
}

.poster {
  width: 140px;
  height: 200px;
  border-radius: 12px;
  border: 2px solid var(--starfleet-gold);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  flex-shrink: 0;
  object-fit: cover;
}

.hero-info {
  flex: 1;
}

.hero-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 24px;
  margin-bottom: 5px;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.hero-year {
  color: var(--starfleet-light);
  font-size: 16px;
  margin-bottom: 15px;
}

.hero-actions {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.btn {
  padding: 10px 15px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn-primary {
  background: var(--gradient-primary);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(11, 93, 158, 0.4);
}

.btn-secondary {
  background: var(--card-bg);
  color: var(--text-primary);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.05);
}

.hero-rating {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: var(--starfleet-gold);
}

/* Contenido principal */
.main-content {
  padding: 20px;
}

.info-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.badge {
  padding: 6px 12px;
  background: var(--card-bg);
  border-radius: 20px;
  font-size: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 5px;
}

.badge i {
  color: var(--starfleet-light);
}

.synopsis {
  margin-bottom: 25px;
  line-height: 1.6;
  color: var(--text-primary);
}

.section-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 20px;
  margin-bottom: 15px;
  color: var(--starfleet-light);
  position: relative;
  padding-left: 15px;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 70%;
  width: 4px;
  background: var(--gradient-primary);
  border-radius: 2px;
}

/* Lightbox */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 7, 24, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
}

.lightbox.active {
  opacity: 1;
  visibility: visible;
}

.lightbox-content {
  width: 90%;
  max-width: 900px;
  position: relative;
}

.lightbox-close {
  position: absolute;
  top: -40px;
  right: 0;
  color: white;
  font-size: 30px;
  cursor: pointer;
  background: none;
  border: none;
}

.responsive-iframe {
  width: 100%;
  aspect-ratio: 16/9;
  border: none;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

/* Footer */
.footer {
  padding: 20px;
  text-align: center;
  color: var(--text-secondary);
  font-size: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

/* Responsive */
@media (max-width: 768px) {
  .hero {
    height: 70vh;
  }
  
  .hero-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .poster {
    width: 120px;
    height: 170px;
  }
  
  .hero-actions {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 20px;
  }
  
  .btn {
    padding: 8px 12px;
    font-size: 12px;
  }
}
</style>
</head>
<body>
  <!-- Header -->
  <header class="header" id="header">
    <i class="fas fa-arrow-left nav-icon" id="back-button"></i>
    <div class="logo">Dani<span>Max</span></div>
    <i class="fas fa-flag nav-icon" id="flag-button"></i>
  </header>

  <!-- Hero Section -->
  <section class="hero">
    <div class="hero-bg"></div>
    <div class="hero-content">
      <img src="https://image.tmdb.org/t/p/w500/${datos.poster_path}" alt="${datos.title}-${datos.release_date.substring(0, 4)}" class="poster">
      <div class="hero-info">
        <h1 class="hero-title">${datos.title}-${datos.release_date.substring(0, 4)}</h1>
        <p class="hero-year">${datos.release_date.substring(0, 4)} - Película</p>
        <div class="hero-actions">
          <button class="btn btn-primary" id="play-button">
            <i class="fas fa-play"></i> Reproducir
          </button>
        </div>
        <div class="hero-rating">
          <i class="fas fa-star"></i>
          <span>${datos.vote_average}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Main Content -->
  <main class="main-content">
    <div class="info-badges">
      <div class="badge">
        <i class="fas fa-film"></i>${convertMinutes(datos.runtime)}
      </div>
      <div class="badge">
        <i class="fas fa-star"></i>${datos.genres.map(genre => genre.name).join(', ')}
      </div>
    </div>

    <div class="synopsis">
      <h2 class="section-title">Sinopsis</h2>
      <p>${datos.overview}</p>
    </div>

  </main>

  <!-- Lightbox para el reproductor -->
  <div class="lightbox" id="player-lightbox">
    <div class="lightbox-content">
      <button class="lightbox-close" id="close-lightbox">
        <i class="fas fa-times"></i>
      </button>
      <iframe class="responsive-iframe" id="player-iframe" src="" frameborder="0" allowfullscreen></iframe>
    </div>
  </div>

  <!-- Footer -->
  <footer class="footer">
    <p>© 2025 Danimax Studios.</p>
  </footer>

  <script>
    // Elementos DOM
    const header = document.getElementById('header');
    const backButton = document.getElementById('back-button');
    const playButton = document.getElementById('play-button');
    const playerLightbox = document.getElementById('player-lightbox');
    const closeLightbox = document.getElementById('close-lightbox');
    
    // Datos de la película
    const movieData = {
      title: "{${datos.title}",
      poster: "https://image.tmdb.org/t/p/original/${datos.poster_path}",
      year: "${datos.release_date.substring(0, 4)}",
      rating: "${datos.vote_average}",
      duration: "${convertMinutes(datos.runtime)}",
      url: "${datalink3}${link2}&titulo=${datos.title}&poster=https://image.tmdb.org/t/p/w500/${datos.poster_path}" // URL de ejemplo (tráiler)
    };
    
    // Scroll event para el header
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
    
    // Navegación hacia atrás
    backButton.addEventListener('click', () => {
      const lastPage = localStorage.getItem("lastPage");
      if (lastPage) {
        window.location.href = lastPage;
      } else {
        window.history.back();
      }
    });
    
    // Abrir el reproductor de video
    function openPlayer() {
      const iframe = document.getElementById('player-iframe');
      iframe.src = movieData.url;
      playerLightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    
    // Cerrar el reproductor de video
    function closePlayer() {
      const iframe = document.getElementById('player-iframe');
      iframe.src = '';
      playerLightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
    
    // Event listeners
    playButton.addEventListener('click', openPlayer);
    closeLightbox.addEventListener('click', closePlayer);
    
    // Cerrar lightbox al hacer clic fuera del contenido
    playerLightbox.addEventListener('click', (e) => {
      if (e.target === playerLightbox) {
        closePlayer();
      }
    });
  </script>
</body>
</html>`;                  

                    template.innerText = justHtml;

                    let templateHTML = template.innerText;



                    const btnCopiar = document.getElementById('copiar');

                    

                    btnCopiar.addEventListener('click', () => {

                        navigator.clipboard.writeText(templateHTML);

                    })

    

    

                    let genPoster = document.getElementById('info-poster');

                    let genTitle = document.getElementById('info-title');

                    let genSeasons = document.getElementById('info-seasons');

                    let genYear = document.getElementById('info-year');

    

                    genPoster.setAttribute('src', `https://image.tmdb.org/t/p/w500/${datos.poster_path}`)

                    genTitle.innerText = datos.title;

                    genSeasons.innerText = "";

                    genYear.innerText = datos.release_date.slice(0,4);

    

    

    

                } else if (respuesta.status === 401) {

                    console.log('Wrong key');

                } else if (respuesta.status === 404) {

                    console.log('No existe');

                }

    

            } catch (error) {

                console.log(error);

            }           

        }



    }



    cargarPeliculas();

}


  var link3 = document.getElementById("link3").value;
  var link4 = document.getElementById("link4").value;

generar();







