// const searchForm = document.querySelector('#srh');

// const getSongs = async (term) => {
//     let uri = `https://tarana-music-player.herokuapp.com/songs/?_sort=name&_order=asc`;

//     if (term) {
//         uri += `&q=${term}`;
//         list.innerHTML = "";
//     }

//     const res = await fetch(uri);
//     const data = await res.json();

//     data.forEach(element => {
//         link = document.createElement('a');
//         link.innerHTML = `${element.id}. ${element.name} &rarr;${element.singer}`;

//         // console.log(element);

//         link.addEventListener('click', function () {
//             track.src = element.path;
//             title.innerHTML = element.name;
//             track_image.src = element.img;
//             artist.innerHTML = element.singer;
//             present.innerHTML = element.id;

//             total.innerHTML = All_song.length;


//             nochange();
//             reset_slider();

//             playsong();

//         });

//         list.append(link);
//     });

// }

// searchForm.addEventListener('input', (e) => {
//     e.preventDefault();
//     getSongs(searchForm.value.trim());

// });

// // window.addEventListener('DOMContentLoaded', () => getSongs());
