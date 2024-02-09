let previous = document.querySelector('#pre'),
    play = document.querySelector('#play'),
    next = document.querySelector('#next'),
    title = document.querySelector('#title'),
    recent_volume = document.querySelector('#volume'),
    volume_icon = document.querySelector('#volume_icon'),
    volume_show = document.querySelector('#volume_show'),
    slider = document.querySelector('#duration_slider'),
    full_duration = document.querySelector('#full_duration'),
    passed_duration = document.querySelector('#passed_duration'),
    track_image = document.querySelector('#track_image'),
    track_name = document.querySelector('#trackName'),
    present = document.querySelector('#present'),
    total = document.querySelector('#total'),
    artist = document.querySelector('#artist'),
    main = document.querySelector('#main'),
    list = document.querySelector('#list'),
    mobi_list = document.querySelectorAll('.track_list'),
    repeat = document.querySelector('#repeat'),
    shuffle = document.querySelector('#shuffle'),
    menu_btn = document.querySelector(".menu-btn"),
    sidenav = document.querySelector(".sidenav"),
    play_open = document.querySelector(".play-open"),
    playlist = document.querySelector(".playlist");

let timer, link, All_song, max, gen, index_no;

// for mobile sidenav
menu_btn.addEventListener("click", () => {
    if (menu_btn.classList.contains("active")) {
        menu_btn.classList.remove("active");
        sidenav.style.left = "-100%"
    } else {
        menu_btn.classList.add("active");
        sidenav.style.left = "0"
    }
});

playlist.addEventListener("click", () => {
    if (!list.classList.contains("play_open")) {
        list.classList.add("play_open");
    } else {
        list.classList.remove("play_open");
    }
})

const id = new URLSearchParams(window.location.search).get('id');

const renderDetails = async () => {
    if (id) {
        const res = await fetch(`https://tarana.onrender.com/songs/` + id);
        if (!res.ok) {
            console.log("No able to fetch songs");
        } else {
            const song = await res.json();
            index_no = parseInt(song.id) - 1;
            GetAllSongs(index_no);
            window.history.pushState("Tarana", "Tarana", "https://iamsonukushwaha.github.io/tarana/");
        }
    } else {
        index_no = 0;
        GetAllSongs(index_no);
    }
}

window.addEventListener('DOMContentLoaded', renderDetails());

function shareplay() {
    // Function to handle sharing options
    const copyLink = document.getElementById('copyLink');
    copyLink.onclick = () => {
        var songlink = `https://iamsonukushwaha.github.io/tarana/?id=${index_no + 1}`;
        navigator.clipboard.writeText(songlink)
            .then(() => {
                alert("Song link copied to clipboard " + songlink);
            })
            .catch((error) => {
                console.error('Error copying link to song: ', error);
            });
    }
    const fbshare = document.getElementById('fbshare');
    fbshare.href = `https://facebook.com/sharer/sharer.php?u=https://iamsonukushwaha.github.io/tarana/?id=${index_no + 1}`
    const twshare = document.getElementById('twshare');
    twshare.href = `https://twitter.com/intent/tweet?text=https://iamsonukushwaha.github.io/tarana/?id=${index_no + 1}`
    const whshare = document.getElementById('whshare');
    whshare.href = `https://api.whatsapp.com/send/?text=https://iamsonukushwaha.github.io/tarana/?id=${index_no + 1}`
}

// creating an audio Element.
let track = document.createElement('audio');

function GetAllSongs(index_no) {
    shareplay();

    fetch("https://tarana.onrender.com/songs/")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            All_song = data;
            max = All_song.length;

            track.src = All_song[index_no].path;
            title.innerHTML = All_song[index_no].name;
            track_name.innerHTML = All_song[index_no].name;
            track_image.src = All_song[index_no].img;
            artist.innerHTML = All_song[index_no].singer;

            track.load();
            track.volume = recent_volume.value / 100;

            timer = setInterval(range_slider, 1000);
            total.innerHTML = All_song.length;
            present.innerHTML = index_no + 1;

            All_song.forEach(element => {
                genLink(element);
            });
        });
}

function genLink(e) {
    link = document.createElement('li');
    link.innerHTML = `<span class="s-name">${e.name}</span><br><span class="s-artist">${e.singer}</span>`;

    link.addEventListener('click', function () {
        index_no = e.id - 1;
        track.src = All_song[e.id - 1].path;
        title.innerHTML = All_song[e.id - 1].name;
        track_name.innerHTML = All_song[e.id - 1].name;
        track_image.src = e.img;
        artist.innerHTML = e.singer;
        present.innerHTML = All_song[e.id - 1].id;
        reset_slider();
        playsong();
    });

    mobi_list.forEach(lists => {
        lists.append(link);
    });
}

var first_click = true;
pausesong();

play.onclick = function () {
    if (first_click) {
        playsong();
        first_click = false;
    } else {
        pausesong();
        first_click = true;
    }
}

var first = true;
volume_icon.onclick = function () {
    if (first) {
        mute_sound();
        first = false;
        volume_icon.classList.add('fa-volume-off');
        volume_icon.classList.remove('fa-volume-up');
        volume_icon.title = "Unmute";
    } else {
        reset_sound();
        first = true;
        volume_icon.classList.remove('fa-volume-off');
        volume_icon.classList.add('fa-volume-up');
        volume_icon.title = "Mute";
    }
}

// sound functions
var curVolume, curVolVal;

function mute_sound() {
    curVolVal = recent_volume.value;
    curVolume = recent_volume.value / 100;
    track.volume = 0;
    volume.value = 0;
    volume_show.innerHTML = 0;
}

function reset_sound() {
    track.volume = curVolume;
    volume.value = curVolVal;
    volume_show.innerHTML = curVolVal;
}

// change volume
function volume_change() {
    volume_icon.title = "Mute";
    if (volume_icon.classList.contains('fa-volume-off')) {
        first = true;
        volume_icon.classList.add('fa-volume-up');
    }
    volume_show.innerHTML = recent_volume.value;
    track.volume = recent_volume.value / 100;
    if (track.volume == 0) {
        first = false;
        volume_icon.title = "Unmute";
        volume_icon.classList.add('fa-volume-off');
        volume_icon.classList.remove('fa-volume-up');
    } else {
        first = true;
        volume_icon.title = "Mute";
        volume_icon.classList.remove('fa-volume-off');
        volume_icon.classList.add('fa-volume-up');
    }
}

recent_volume.oninput = function () {
    volume_show.innerHTML = this.value;
    track.volume = this.value / 100;
}

// reset song slider
function reset_slider() {
    slider.value = 0;
}

// play song
function playsong() {
    shareplay();
    track.play();
    first_click = false;
    play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
    play.title = "Pause";
}

// pause song
function pausesong() {
    track.pause();
    first_click = true;
    play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
    play.title = "Play";
}

// next song
function next_song() {
    if (index_no < All_song.length - 1) {
        index_no += 1;
        out();
    } else {
        index_no = 0;
        out();
    }
}


// previous song
function previous_song() {
    if (index_no > 0) {
        index_no -= 1;
        out();
    } else {
        index_no = All_song.length - 1;
        out();
    }
}

var curmins, cursecs;

// change slider position
function change_duration() {
    slider_position = track.duration * (slider.value / 100);
    track.currentTime = slider_position;
}

function changeDur() {
    slider_position = track.duration * (slider.value / 100);
    track.currentTime = slider_position;
    curmins = Math.floor(track.currentTime / 60), cursecs = Math.floor(track.currentTime - curmins * 60);

    if (cursecs < 10) {
        passed_duration.innerHTML = `${curmins} : 0${cursecs}`;
    } else {
        passed_duration.innerHTML = `${curmins} : ${cursecs}`;
    }
}

// for repeat
var select = true;
repeat.innerHTML = `<i class="bi bi-arrow-clockwise"></i>`;

// for shuffle
var selected = true;

function range_slider() {
    let position = 0;
    // Update slider position
    if (!isNaN(track.duration)) {
        position = track.currentTime * (100 / track.duration);
        slider.value = position;

        curmins = Math.floor(track.currentTime / 60);
        cursecs = Math.floor(track.currentTime - curmins * 60);
        passed_duration.innerHTML = cursecs < 10 ? `${curmins} : 0${cursecs}` : `${curmins} : ${cursecs}`;

        var durmins = Math.floor(track.duration / 60);
        dursecs = Math.floor(track.duration - durmins * 60);
        full_duration.innerHTML = dursecs < 10 ? `${durmins} : 0${dursecs}` : `${durmins} : ${dursecs}`;
    }

    // Handle repeat functionality
    repeat.onclick = function () {
        if (select) {
            repeat.innerHTML = `1`;
            repeat.classList.add('selected');
            repeat.classList.remove('repeat');
            repeat.title = "Disable repeat";
            select = false;
        } else {
            repeat.innerHTML = `<i class="bi bi-arrow-clockwise"></i>`;
            repeat.classList.add('repeat');
            repeat.classList.remove('selected');
            select = true;
            repeat.title = "Enable repeat";
        }
    }

    // Handle shuffle functionality
    shuffle.onclick = function () {
        if (selected) {
            shuffle.classList.add('selected');
            shuffle.classList.remove('shuffle');
            selected = false;
            shuffle.title = "Disable shuffle";
        } else {
            shuffle.classList.remove('selected');
            shuffle.classList.add('shuffle');
            selected = true;
            shuffle.title = "Enable shuffle";
        }
    }

    // Function to play a random song when shuffle is selected and track ends
    function playRandomSong() {
        var anotherRandom = Math.floor(Math.random() * max);
        index_no = anotherRandom;
        out();
    }

    // Function will run when the song is over
    if (track.ended) {
        if (shuffle.classList.contains("selected")) {
            playRandomSong();
        } else if (repeat.classList.contains("selected")) {
            track.currentTime = 0; // Start playing the same song again
            track.play();
        } else {
            next_song(); // Play the next song
        }
    }
}


function out() {
    track.src = All_song[index_no].path;
    title.innerHTML = All_song[index_no].name;
    track_name.innerHTML = All_song[index_no].name;
    track_image.src = All_song[index_no].img;
    artist.innerHTML = All_song[index_no].singer;
    track.load();
    timer = setInterval(range_slider, 1000);
    total.innerHTML = All_song.length;
    present.innerHTML = index_no + 1;
    playsong();
}

// dark mode
var body = document.getElementById("body");
var m = document.getElementById("main");
var themebtn = document.getElementById("themebutton");
var fc = true;

const active_tab = document.querySelector(".active"),
    music_controls = document.querySelector(".music-controls"),
    music_player = document.querySelector(".music-player"),
    bi_btn = document.querySelectorAll(".bi-btn"),
    song_slate = document.querySelector(".song-slate"),
    volu = document.querySelector(".vol"),
    vol_range = document.querySelector(".vol-range"),
    playing = document.querySelector(".playing"),
    list_hover = document.querySelectorAll(".sub-nav-list"),
    playlist_hover = document.querySelectorAll(".track_list li");

n_ch();
themebtn.onclick = function () {
    if (fc) {
        ch();
        fc = false;
    } else {
        n_ch();
        fc = true;
    }
}

// dark
function ch() {
    themebtn.style.color = "#fff";
    themebtn.style.backgroundColor = "#1d2742";
    body.style.backgroundColor = "black";
    m.style.backgroundColor = "#414A4C";
    sidenav.style.backgroundColor = "#192033"
    playlist.style.color = "white";
    active_tab.style.backgroundColor = "#273251";
    music_controls.style.backgroundColor = "#181c2d";
    music_player.style.background = "#080f24";
    shuffle.style.backgroundColor = "#273251";
    repeat.style.backgroundColor = "#273251";
    song_slate.style.color = "#fff";
    playing.style.color = "#aea4a4";
    play.style.backgroundColor = "#393d4d";
    volu.style.backgroundColor = "#393d4d";
    vol_range.style.backgroundColor = "#393d4d";

    bi_btn.forEach(btn => {
        btn.style.backgroundColor = "#1d2742"
    });

    list_hover.forEach(list => {
        list.addEventListener("mouseover", () => {
            list.style.backgroundColor = "#273251";
        });
    });
    list_hover.forEach(list => {
        list.addEventListener("mouseout", () => {
            if (!list.classList.contains("active")) {
                list.style.backgroundColor = "transparent";
            }
        });
    })

    playlist_hover.forEach(list => {
        list.addEventListener("mouseover", () => {
            list.style.backgroundColor = "#273251";
        });
    });
    playlist_hover.forEach(list => {
        list.addEventListener("mouseout", () => {
            list.style.backgroundColor = "transparent";
        });
    });

}

// light
function n_ch() {
    themebtn.style.color = "white";
    themebtn.style.backgroundColor = "#143599";
    body.style.backgroundColor = "white";
    m.style.backgroundColor = "#FFFAFA";
    sidenav.style.backgroundColor = "#03164d";
    playlist.style.color = "black";
    active_tab.style.backgroundColor = "#072888";
    music_controls.style.backgroundColor = "#5a75c6 ";
    music_player.style.background = "linear-gradient(#0a388e 1%, #b1f0f7 80%)";
    shuffle.style.backgroundColor = "#0876ec";
    repeat.style.backgroundColor = "#0876ec";
    song_slate.style.color = "black";
    playing.style.color = "black";
    play.style.backgroundColor = "#2d349f";
    volu.style.backgroundColor = "#2d349f";
    vol_range.style.backgroundColor = "#2d349f";

    bi_btn.forEach(btn => {
        btn.style.backgroundColor = "#143599"
    });

    list_hover.forEach(list => {
        list.addEventListener("mouseover", () => {
            list.style.backgroundColor = "rgb(7, 40, 136)";
        });
    })
    list_hover.forEach(list => {
        list.addEventListener("mouseout", () => {
            if (!list.classList.contains("active")) {
                list.style.backgroundColor = "transparent";
            }
        });
    })

    playlist_hover.forEach(list => {
        list.addEventListener("mouseover", () => {
            list.style.backgroundColor = "red";
        });
    })
    playlist_hover.forEach(list => {
        list.addEventListener("mouseout", () => {
            list.style.backgroundColor = "transparent";
        });
    });
}
