const id = new URLSearchParams(window.location.search).get('id');

const renderDetails = async () => {
    const res = await fetch(`https://www.sonu.live/music-player/songs/` + id);
    if (!res.ok) {
        window.location.replace("./index.html");
    }

    const song = await res.json();
    // track.src = song.path;
    title.innerHTML = song.name;
    // track_image.src = song.img;
    artist.innerHTML = song.singer;

    track.load();
    track.volume = recent_volume.value / 100;

    timer = setInterval(range_slider, 1000);
    present.innerHTML = song.id;

}

window.addEventListener('DOMContentLoaded', renderDetails);