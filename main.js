const searchForm = document.querySelector('#srh');

const getSongs = async (term) => {
    let uri = `https://tarana-music-player.herokuapp.com/songs/?_sort=name&_order=asc`;

    if(term) {
        uri += `&q=${term}`;
        list.innerHTML = "";
    }

    const res = await fetch(uri);
    const data = await res.json();
    
    data.forEach(element => {
        link = document.createElement('a');
        link.innerHTML = `${element.id}. ${element.name} &rarr;${element.singer}`;

        link.addEventListener('click', function () {
            index_no = element.id - 1;
            track.src = All_song[element.id - 1].path;
            title.innerHTML = All_song[element.id - 1].name;
            track_image.src = element.img;
            artist.innerHTML = element.singer;
            present.innerHTML = All_song[element.id - 1].id;


            nochange();
            reset_slider();

            playsong();

        });
        
        list.append(link);
    });

}

searchForm.addEventListener('input', (e) => {
    e.preventDefault();
    getSongs(searchForm.value.trim());

});

window.addEventListener('DOMContentLoaded', () => getSongs());
