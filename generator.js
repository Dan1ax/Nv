let isSerie = document.getElementById('serie');
let isMovie = document.getElementById('movie');

let types = document.querySelectorAll('input[type=radio][name=type]');

types.forEach(type => {
    type.addEventListener('change', () =>{
        if (type.value == "movie") {
            document.getElementById('season-selector').style.display = "none";
        } else if (type.value == "serie"){
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

                const respuesta = await fetch(`https://api.themoviedb.org/3/tv/${serieKey}?api_key=ef9d33cc91a9d46d9bcf364a274ced72&language=${languaje}`);
                const respuesta3 = await fetch(`https://api.themoviedb.org/3/tv/${serieKey}/season/${seasonNumber}?api_key=ef9d33cc91a9d46d9bcf364a274ced72&language=${languaje}`);
    
                if (respuesta.status === 200) {
                    const datos = await respuesta.json();
                    const datosTemporada = await respuesta3.json();
                        
                    let tags = '';
    
                    datos.genres.forEach(genre => {
                        if (genre.name != datos.genres[datos.genres.length - 1].name) {
                            tags += `${genre.name}, `
                        } else {
                            tags += datos.genres[datos.genres.length - 1].name
                        }
                    });

                    let creators = '';
    
                    datos.created_by.forEach((creator, i) => {
                        if (i == datos.created_by.length - 1){
                            creators += creator.name
                        } else{
                            creators += `${creator.name}, `

                        }
                    });
    
                       
                    let episodeList = '';
    
                    datosTemporada.episodes.forEach(episode => {
                        let runtime ;
                        if (episode.runtime != null) {
                            runtime = convertMinutes(episode.runtime);
                        } else {
                            runtime = ''
                        }
                        episodeList += `
                        [Episodio ${episode.episode_number}|https://www.youtube.com/embed/zh4KhVSMwtQ]
                        `
                    })
    
                    let seasonsOption = '';
    
                    datos.seasons.forEach(season => {
                        
                        if(season.name != "Especiales"){
                            seasonsOption += `<option value="${season.season_number}">Temporada ${season.season_number}</option>
                            `
                        }
                    })
    
                    let genSeasonsCount;
    
                    if (datos.number_of_seasons == 1){
                        genSeasonsCount = " Temporada"
                    } else if (datos.number_of_seasons > 1){
                        genSeasonsCount = " Temporadas"
                    }
                    
                    let template = document.getElementById('html-final');
    
                    let justHtml = `
[stt/Serie]
[hd/HD]
[sc/${datos.vote_average.toFixed(1)}]

<!-- 
TITULO DE LA ENTRADA:     ${datos.name} - ${datos.first_air_date.slice(0,4)}
GENEROS/ETIQUETAS:    ${tags} Imagem do fundo https://image.tmdb.org/t/p/w1280/${datos.backdrop_path}, Series
-->

<span class='temp+'><!--more-->${datos.number_of_seasons + genSeasonsCount}</span>

<img alt="nomedofilme" src="https://image.tmdb.org/t/p/w300${datos.poster_path}" style="display: none;" />
<p>

[ss]
[Trailer;https://www.youtube.com/embed/l6kp780S-os*]
[/ss]

[nd]
${datos.overview}
[/nd]


<!--Lista de Episodios-->
<div class="season-list add-on hidden">
<div class="select-season">
<h2>Episodios</h2>
<select name="" id="select-season">
${seasonsOption}

</select>
</div>

<div id="temps">
<ul class="caps-grid animation" id="season-${seasonNumber}">

<id>
[br/Episodios temporada ${seasonNumber}]

  ${episodeList}
</ul>


<!--INGRESAR MAS TEMPORADAS AQUI -->

</div>
</div>
<!--Todos os direitos reservados @Plantillasseo.online -->
  
                    `;
                    
                    let seasonOnly = `
                    <ul class="caps-grid hide" id="season-${seasonNumber}">
                    [br/Episodios temporada ${seasonNumber}]
                    ${episodeList}
                    </ul>

                     `;
    
                    const btnCopiar = document.getElementById('copiar');
    
                    if (seasonNumber == 1) {
                        template.innerText = justHtml;
                    } else if (seasonNumber > 1){
                        template.innerText = seasonOnly;
                    }
    
                    let templateHTML = template.innerText;
                    console.log(justHtml, typeof justHtml)
                    btnCopiar.addEventListener('click', () => {
                        navigator.clipboard.writeText(templateHTML);
                    })

                    
                    let genPoster = document.getElementById('info-poster');
                    let genTitle = document.getElementById('info-title');
                    let genSeasons = document.getElementById('info-seasons');
                    let genYear = document.getElementById('info-year');
    
                    genPoster.setAttribute('src', `https://image.tmdb.org/t/p/w300/${datos.poster_path}`)
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
        } else
        if(isMovie.checked){
            try {

            const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${serieKey}?api_key=ef9d33cc91a9d46d9bcf364a274ced72&language=${languaje}`);

            if (respuesta.status === 200) {
                const datos = await respuesta.json();
                console.log(datos);


                let tags = '';

                datos.genres.forEach(genre => {
                    if (genre.name != datos.genres[datos.genres.length - 1].name) {
                        tags += `${genre.name}, `
                    } else {
                        tags += datos.genres[datos.genres.length - 1].name
                    }
                });


                    let template = document.getElementById('html-final');

                    let justHtml = `[stt/Filme]
[hd/HD]
[sc/${datos.vote_average.toFixed(1)}]

<!-- 
Nome Do Filme:    ${datos.title} - ${datos.release_date.slice(0,4)}
GENEROS/ETIQUETAS:    ${tags} https://image.tmdb.org/t/p/w1280/${datos.backdrop_path}, Filme
-->

<span><!--more--></span>
<img alt="nomedofilme" src="https://image.tmdb.org/t/p/w300/${datos.poster_path}" style="display: none;" />
<p>

[ss]
[Trailer;https://www.youtube.com/embed/l6kp780S-os*]
[/ss]

[nd]
${datos.overview}
[/nd]

<id>

[br/Assistir Agora]

[Opción 1|https://www.youtube.com/embed/a8Gx8wiNbs8]

[Opción 2|https://www.youtube.com/embed/DwuJeGYlYyw]

[Opción 3|https://www.youtube.com/embed/zh4KhVSMwtQ] 

  <!--Todos os direitos reservados @Plantillasseo.online-->

`;                  
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
    
                    genPoster.setAttribute('src', `https://image.tmdb.org/t/p/w300/${datos.poster_path}`)
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

generar();



