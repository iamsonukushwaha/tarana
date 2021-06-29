let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume= document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');
let main = document.querySelector('#main');


let timer;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;

//creating an audio Element.
let track = document.createElement('audio');


//All songs list.
//Add as many song as you want.
let All_song = [
	//{
     	  //name: ".....",     Name of song
     	  //path: "music/..... .mp3",     Name of song With extention, don't forget to give underscore or hyphen in between the words of Songs, Here as well as in your Directory. 
     	  //img: "img/..... .jpg",     Name of the image of audio with extenstin.
     	  //singer: "....."     Name of the Singers of the Song.
   	//},
	{
	 name: "Baarish",
	 path: "music/Baarish.mp3",
	 img: "img/Baarish.jpeg",
	 singer: "Tanishk Bagchi, Ash King & Shashaa Tirupati"
	},
	{
	 name: "Be Intehaan",
	 path: "music/Be_Intehaan.mp3",
	 img: "img/Be_Intehaan.jpeg",
	 singer: "Atif Aslam & Sunidhi Chauhan"
	},
	{
	 name: "Chashni",
	 path: "music/Chashni.mp3",
	 img: "img/Chashni.jpeg",
	 singer: "Abhijeet Srivastava"
	},
	{
	 name: "Chedkhaniyaan",
	 path: "music/Chedkhaniyaan.mp3",
	 img: "img/Chedkhaniyaan.jpeg",
	 singer: "Shankar Mahadevan, Ehsaan & Loy"
	},
	{
	 name: "Dil Jaaniye",
	 path: "music/Dil_Jaaniye.mp3",
	 img: "img/Dil_Jaaniye.jpeg",
	 singer: "Tulsi Kumar & Jubin Nautiyal"
	},
	{
	 name: "Dil Meri Na Sune",
	 path: "music/Dil_Meri_Na_Sune.mp3",
	 img: "img/Dil_Meri_Na_Sune.jpeg",
	 singer: "Atif Aslam & Payal Dev"
	},
	{
	  name: "Hawayein",
	  path: "music/Hawayein.mp3",
	  img: "img/Hawayein.jpeg",
	  singer: "Arijit Singh & Pritam"
	},
	{
	  name: "Kaun Tujhe",
	  path: "music/Kaun_Tujhe.mp3",
	  img: "img/Kaun_Tujhe.jpeg",
	  singer: "Palak Muchhal"
	},
	{
	 name: "Pal",
	 path: "music/Pal.mp3",
	 img: "img/Pal.jpeg",
	 singer: "Arijit Singh & Shreya Ghoshal"
	},
	{
	 name: "Chaahunga",
	 path: "music/Phir_Bhi_Tumko_Chaahunga.mp3",
	 img: "img/Phir_Bhi_Tumko_Chaahunga.jpeg",
	 singer: "Mithoon, Arijit Singh & Shashaa Tirupati"
	},
	{
	 name: "Phir Kabhi",
	 path: "music/Phir_Kabhi.mp3",
	 img: "img/Phir_Kabhi.jpeg",
	 singer: "Arijit Singh"
	},
	{
	 name: "Rabba Main Toh",
	 path: "music/Rabba_Main_Toh_Mar_Gaya_Oye.mp3",
	 img: "img/Rabba_Mai_To_Mar_Gya_Oye.webp",
	 singer: "Rahat Fateh Ali Khan"
	},
	{
	 name: "Saude Bazzi",
	 path: "music/Saude_Bazzi.mp3",
	 img: "img/Saude_Baazi.webp",
	 singer: "Javed Ali"
	},
	{
	 name: "Shukran Allah",
	 path: "music/Shukran_Allah.mp3",
	 img: "img/Shukran_Allah.webp",
	 singer: "Sonu Nigam"
	},
	{
	 name: "Suno Na Suno Na",
	 path: "music/Suno_Na_Suno_Na.mp3",
	 img: "img/Suno_Na_Suno_Na.jpeg",
	 singer: "Abhijeet Bhattacharya"
	},
	{
	 name: "Tumhare Yeh Ishare",
	 path: "music/Tauba_Tumhare_Yeh_Ishare.mp3",
	 img: "img/Tauba_Tumhare_Yeh_Ishare.jpeg",
	 singer: "Abhijeet Bhattacharya"
	},
	{
	 name: "Tera Hone Laga",
	 path: "music/Tera_Hone_Laga_Hoon.mp3",
	 img: "img/Tera_Hone_Laga_Hoon.jpeg",
	 singer: "Atif Aslam & Alisha Chinoy"
	},
	{
	 name: "Tere Bin Nahi Laage",
	 path: "music/Tere_Bin_Nahi_Laage-Male.mp3",
	 img: "img/Tere_Bin_Nahi_Lage.jpeg",
	 singer: "Uzair Jaswal"
	},
	{
	 name: "Teri Jhuki Nazar",
	 path: "music/Teri_Jhuki_Nazar.mp3",
	 img: "img/Teri_Jhuki_Nazar.jpeg",
	 singer: "Shafqat Amanat Ali"
	},
	{
	 name: "Thoda Thoda Pyaar",
	 path: "music/Thoda_Thoda_Pyaar.mp3",
	 img: "img/Thoda_Thoda_Pyar.jpeg",
	 singer: "Stebin Ben"
	}
];


// Functions Starts Here 


// function load the track
function load_track(index_no){
	clearInterval(timer);
	reset_slider();

	track.src = All_song[index_no].path;
	title.innerHTML = All_song[index_no].name;	
	track_image.src = All_song[index_no].img;
    artist.innerHTML = All_song[index_no].singer;
    track.load();

	timer = setInterval(range_slider ,1000);
	total.innerHTML = All_song.length;
	present.innerHTML = index_no + 1;
}

load_track(index_no);


//mute sound function
function mute_sound(){
	track.volume = 0;
	volume.value = 0;
	volume_show.innerHTML = 0;
}


// checking.. the song is playing or not
 function justplay(){
 	if(Playing_song==false){
 		playsong();

 	}else{
 		pausesong();
 	}
 }


// reset song slider
 function reset_slider(){
 	slider.value = 0;
 }

// play song
function playsong(){
  track.play();
  Playing_song = true;
  play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

//pause song
function pausesong(){
	track.pause();
	Playing_song = false;
	play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}


// next song
function next_song(){
	if(index_no < All_song.length - 1){
		index_no += 1;
		load_track(index_no);
		playsong();
	}else{
		index_no = 0;
		load_track(index_no);
		playsong();

	}
}


// previous song
function previous_song(){
	if(index_no > 0){
		index_no -= 1;
		load_track(index_no);
		playsong();

	}else{
		index_no = All_song.length;
		load_track(index_no);
		playsong();
	}
}


// change volume
function volume_change(){
	volume_show.innerHTML = recent_volume.value;
	track.volume = recent_volume.value / 100;
}


// change slider position 
function change_duration(){
	slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
}


// autoplay function
function autoplay_switch(){
	if (autoplay==1){
       autoplay = 0;
       auto_play.style.background = "linear-gradient(145deg, #4d8fcf, #5baaf6)";
	}else{
       autoplay = 1;
       auto_play.style.background = "linear-gradient(145deg, #cf5fb0, #f670d2)";
	}
}


function range_slider(){
	let position = 0;
        
    // update slider position
	if(!isNaN(track.duration)){
	   position = track.currentTime * (100 / track.duration);
	   slider.value =  position;
	}

       
    // function will run when the song is over
    if(track.ended){
       	play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
        if(autoplay==1){
		    index_no += 1;
		    load_track(index_no);
		    playsong();
        }
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
