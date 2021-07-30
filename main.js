
let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');
let main = document.querySelector('#main');
let list = document.querySelector('#list');


let timer;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;

//creating an audio Element.
let track = document.createElement('audio');

let All_song;



load_track(index_no);

// function load the track

function load_track(index_no) {

  clearInterval(timer);
  reset_slider();

  fetch("https://www.sonu.live/Music-Player/db.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      All_song = data;
      // console.log(All_song.length);
      // console.log(All_song[index_no].path);

      track.src = All_song[index_no].path;
      title.innerHTML = All_song[index_no].name;
      track_image.src = All_song[index_no].img;
      artist.innerHTML = All_song[index_no].singer;
      
      
      track.load();
      
      timer = setInterval(range_slider, 1000);
      total.innerHTML = All_song.length;
      present.innerHTML = index_no + 1;
      
      All_song.forEach(element => {
        // console.log(element);
        // console.log(element.singer);
        let link = document.createElement('a');
        link.innerHTML = `${element.id}. ${element.name} &rarr; ${element.singer} <br/><br/><br/>`;
        link.addEventListener('click',function() {
          track.src = element.path;
          title.innerHTML = element.name;
          track_image.src = element.img;
          artist.innerHTML = element.singer;
          index_no = element.id;
          present.innerHTML = index_no;

          nochange();

        })

        list.append(link);

      });


    });

}


//mute sound function
function mute_sound() {
  track.volume = 0;
  volume.value = 0;
  volume_show.innerHTML = 0;
}


// checking.. the song is playing or not
function justplay() {
  if (Playing_song == false) {
    playsong();

  } else {
    pausesong();
  }
}


// reset song slider
function reset_slider() {
  slider.value = 0;
}

// play song
function playsong() {
  track.play();
  Playing_song = true;
  play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

//pause song
function pausesong() {
  track.pause();
  Playing_song = false;
  play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}



// next song
function next_song() {
  if (index_no < All_song.length - 1) {
    index_no += 1;
    load_track(index_no);
    playsong();
  } else {
    index_no = 0;
    load_track(index_no);
    playsong();

  }
}


// previous song
function previous_song() {
  if (index_no > 0) {
    index_no -= 1;
    load_track(index_no);
    playsong();

  } else {
    index_no = All_song.length;
    load_track(index_no);
    playsong();
  }
}

// change volume
function volume_change() {
  volume_show.innerHTML = recent_volume.value;
  track.volume = recent_volume.value / 100;
}


// change slider position 
function change_duration() {
  slider_position = track.duration * (slider.value / 100);
  track.currentTime = slider_position;
}


// autoplay function
function autoplay_switch() {
  if (autoplay == 1) {
    autoplay = 0;
    auto_play.style.background = "linear-gradient(145deg, #4d8fcf, #5baaf6)";
  } else {
    autoplay = 1;
    auto_play.style.background = "linear-gradient(145deg, #cf5fb0, #f670d2)";
  }
}



function range_slider() {
  let position = 0;

  // update slider position
  if (!isNaN(track.duration)) {
    position = track.currentTime * (100 / track.duration);
    slider.value = position;
  }

  // function will run when the song is over
  if (track.ended) {
    next_song();

  }
}


// Function to open and close documentation.
const hide_show = document.getElementById('hide_show');
const main_body_hide = document.getElementById('main_body_hide');
var first_click = true;
nochange();

hide_show.onclick = function () {
  if (first_click) {
    change();
    first_click = false;
  }
  else {
    nochange();
    first_click = true;
  }
}


function change() {
  main_body_hide.style.display = '';
  main.style.display = 'none';
  hide_show.innerText = 'X';
  hide_show.style.color = "#fff";
}


function nochange() {
  main_body_hide.style.display = 'none';
  main.style.display = '';
  hide_show.innerText = '☰';
  hide_show.style.color = "#fff";
}


