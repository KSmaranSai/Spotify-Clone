console.log("Welcome to spotify");

// initialize variable
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let progressBar = document.getElementById("progress-bar");
let gif = document.querySelector(".song-info img");
let songItems = Array.from(document.getElementsByClassName("song-item"));
let masterSongName = document.getElementById("masterSongName");

let songs = [
    { songName: "It's Always Blue - Legion", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Trap - Cartel", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "They Mad - Lowkey Pesci", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Rich The Kid - Plug Walk", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Song Title - Artist", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "The safety Dance - Sple lokley", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Back It Up - Mortals", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Cielo - Huma Huma", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Deaf Kev - Invincible", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "True Love - NCS release", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
]

songItems.forEach(function (element, i) {
    element.querySelector("img").src = songs[i].coverPath;
    element.querySelector("span").innerHTML = songs[i].songName;
})

function stopAllPlays() {
    Array.from(document.getElementsByClassName("song-item-play")).forEach(function (element) {
        element.classList.remove("fa-pause");
        element.classList.add("fa-play");
    })
}

//listen to events

//timeupdate event triggers only when the current time is updated in the audio element 
audioElement.addEventListener('timeupdate', function () {
    let progress = parseInt(audioElement.currentTime / audioElement.duration * 100);
    progressBar.value = progress;
})

// handle play pause
masterPlay.addEventListener('click', function () {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    }
    else {
        stopAllPlays();
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
});

progressBar.addEventListener('change', function () {
    audioElement.currentTime = progressBar.value * audioElement.duration / 100;
})

Array.from(document.getElementsByClassName("song-item-play")).forEach(function (element) {
    element.addEventListener('click', function (key) {
        stopAllPlays();
        songIndex = parseInt(key.target.id);
        key.target.classList.remove("fa-play");
        key.target.classList.add("fa-pause");
        play(songIndex);
    })
})

function play(index){
    masterSongName.innerHTML = songs[index+1].songName;
    audioElement.src = `songs/${index+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    gif.style.opacity = 1;
}

document.getElementById('next').addEventListener('click', function (key) {
    stopAllPlays();
    if (songIndex == 9) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    play(songIndex);
})

document.getElementById('previous').addEventListener('click', function (key) {
    stopAllPlays();
    if (songIndex == 0) {
        songIndex = 9;
    }
    else {
        songIndex -= 1;
    }
    play(songIndex);
})