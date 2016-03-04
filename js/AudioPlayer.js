(function (window, undefined) {
	/*
	* JSAudioPlayer variables.
	*/
	var audio = undefined,
			loop = false,
			volumeValue = 0.5,
			duration = undefined,
			currentTime = undefined,
			songRange = document.querySelector('#song-range'),
			name = document.querySelector('#song-name'),
			artist = document.querySelector('#artist'),
			cont = 0,
			playPause = document.querySelector('#play-pause'),
			prev = document.querySelector('#prev'),
			next = document.querySelector('#next'),
			repeat = document.querySelector('#repeat'),
			volume = document.querySelector('#vol-range'),
			toggle = true;

	/*
	* Harcoded song collection for testing.
	*/
	var songList = [
		{ src: 'audio/1.mp3', name: 'Bang Bang (My Baby Shot Me Down)', artist: "Nico Vega", background: "img/backgrounds/nico-vega.jpg"},
		{ src: 'audio/2.mp3', name: 'Blame It On Me', artist: "Bang Camaro", background: "img/backgrounds/bang-camaro.jpg"},
		{ src: 'audio/3.mp3', name: 'Kriptonite', artist: "Three Doors Down", background: "img/backgrounds/three-doors-down.jpg"}
	];

	function initSong() {

		audio = document.createElement('audio');
		audio.setAttribute('src', songList[0].src);
		audio.durationchange = duration;
		audio.volume = volumeValue;
		audio.setAttribute('loop', loop);

		duration = document.querySelector('#duration');
		currentTime = document.querySelector('#currentTime');
		name.innerHTML = songList[cont].name;
		artist.innerHTML = songList[cont].artist;
		document.body.style.backgroundImage = "url(" + songList[0].background + ")";
		songRange.setAttribute('max', duration);
		
		/*
		* Audio events.
		*/
		audio.addEventListener('durationchange', setDuration);
		audio.addEventListener('timeupdate', setDuration);
		audio.addEventListener('ended', autoChange);

		/*
		* Print playlist.
		*/
		for(i = 0; i < songList.length; i++){
			document.querySelector('#songList').innerHTML += 
			'<li class="song-list-container">' + 
				'<img class="play" src="img/play.svg" onclick="player.selectList(' + i + ')"/>' + 
				'<p>' + songList[i].name + '</p>' +
			'</li>';
		}
		// setCurrentTime();
	};

	function autoChange(){
		nextSong();
	} 

	function setDuration(){
		var mins = Math.floor(audio.duration / 60);
		var secs = (Math.ceil(audio.duration) / 60) * 10;

		duration.innerHTML = ' / ' + mins + ':' + Math.round(secs);
		songRange.setAttribute('value', audio.currentTime / audio.duration);

		cTime = Math.floor(this.currentTime);
	 	ontimeupdate= console.log(cTime);
	};

	// function setCurrentTime(){
	// 	// currentTime.innerHTML = 0 + ':' + Math.floor(audio.currentTime);
	// 	cTime = Math.floor(this.currentTime);
	// }

	/*
	* Play-Pause actual song.
	*/
	playPause.addEventListener('click', function (click) {
		if(toggle == true){
			audio.play();
			toggle = false;	
			playPause.setAttribute('src', 'img/pause.svg');
		}else{
			audio.pause();
			toggle = true;
			playPause.setAttribute('src', 'img/play.svg');
		}
	});

	function playFromList(id){
		audio.setAttribute('src', songList[ id ].src);
		name.innerHTML = songList[ id ].name;
		artist.innerHTML = songList[ id ].artist;
		document.body.style.backgroundImage = "url(" + songList[ id ].background + ")";
		cont = id;
		audio.play();
	}

	/*
	* Repeats actual song.
	*/
	repeat.addEventListener('click', function (click) {
		var audioLoopAttr = audio.getAttribute('loop');

		if(audioLoopAttr == "false"){
			audio.setAttribute('loop', true);
			audio.className ='pressed';
			console.log(audio);
		} else {
			audio.setAttribute('loop', false);
			audio.className = 'repeat';
			console.log(audio);
		}
	});

	/*
	* Play previous song.
	*/
	prev.addEventListener('click', function (click) {
		if(cont > 0){
			cont--;
			audio.setAttribute('src', songList[cont].src);
			name.innerHTML = songList[cont].name;
			artist.innerHTML = songList[cont].artist;
			document.body.style.backgroundImage = "url(" + songList[cont].background + ")";
			audio.play();
		} else {
			return;
		}
	});

	/*
	* Play next song.
	*/
	next.addEventListener('click', function nextSong() {
		if(cont < songList.length - 1){
			cont++;
			audio.setAttribute('src', songList[cont].src);
			name.innerHTML = songList[cont].name;
			artist.innerHTML = songList[cont].artist;
			document.body.style.backgroundImage = "url(" + songList[cont].background + ")";
			audio.play();
		} else {
			return;
		}
	});

	/*
	* Handles the volume level (0.0 = muted, 1.0 = full volume)
	*/
	volume.addEventListener('input', function (click){
		audio.volume = this.value;
	});

	window.Player = function () {
		initSong(songList);
		return{
			// vol: 				vol,
		  selectList: playFromList
		}
	}
})(window, undefined);