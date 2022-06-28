const id = new URLSearchParams(window.location.search).get('id');


const renderDetails = async () => {
    const res = await fetch(`https://tarana-music-player.herokuapp.com/songs/` + id);
    if (!res.ok) {
        // window.location.replace("./index.html");
        window.history.pushState("object or string", "Title", "https://sonukushwaha.me/tarana/play.html");
    }

    const song = await res.json();

    track.src = song.path;
    title.innerHTML = song.name;
    track_image.src = song.img;
    artist.innerHTML = song.singer;

    track.load();
    track.volume = recent_volume.value / 100;

    timer = setInterval(range_slider, 1000);
    present.innerHTML = song.id;

    
    total.innerHTML = song.length;

}




window.addEventListener('DOMContentLoaded', renderDetails);
