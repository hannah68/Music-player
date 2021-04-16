const musicContainer = document.getElementById('music-container');
const audio = document.getElementById('audio');
const cover = document.getElementById('cover');
const songName = document.getElementById('song-name');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');


// song title=================
const songs = ['Blank Space','Im Calling You','Shape of You','Diamonds','Feel Me','Send My Love','Love to See You Cry','Fairytale','Show Me the Meaning of Being Lonely','IDGAF'];

// keep track of song Index========
let songIndex =2;

loadSong(songs[songIndex]);

// update songs details=============
function loadSong(song){
    songName.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

// play song==========================
function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

// pause song======================
function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}

// previous song================
function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex]);
    playSong();
}

// next song====================
function nextSong(){
    songIndex++;
    if(songIndex > songs.length-1){
        songIndex = 0
    }
    loadSong(songs[songIndex]);
    playSong();
}

// update song/time progress================
function updateProgress(e){
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// set progreess===========================
function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}


// Event listener=============================
playBtn.addEventListener('click',function(){
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying){
        pauseSong();
    }else{
        playSong();
    }
});

prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);

audio.addEventListener('timeupdate',updateProgress);
audio.addEventListener('ended',nextSong);
progressContainer.addEventListener('click',setProgress);