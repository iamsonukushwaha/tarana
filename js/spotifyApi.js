var queue = "";
var access_token = null;
var refresh_token = null;
var redirect_uri = "http://127.0.0.1:5500/index.html"; // change this your value
var client_id = ""; 
var client_secret = ""; // In a real app you should not expose your client_secret to the user
const AUTHORIZE = "https://accounts.spotify.com/authorize";
const TOKEN = "https://accounts.spotify.com/api/token";

// API Links
const USER = `https://api.spotify.com/v1/me`;
const DEVICES = "https://api.spotify.com/v1/me/player/devices";
const FOLLOWED_ARTISTS = 'https://api.spotify.com/v1/me/following?type=artist&limit=50';
const SAVED_ALBUMS = 'https://api.spotify.com/v1/me/albums?limit=50';
const LIKED_TRACKS = 'https://api.spotify.com/v1/me/tracks?limit=50'





onPageLoad();

function onPageLoad(){
    client_id = localStorage.getItem("client_id");
    client_secret = localStorage.getItem("client_secret");
    if ( window.location.search.length > 0 ){
        handleRedirect();
    }
    else{
        access_token = localStorage.getItem("access_token");
    }
}

function handleRedirect(){
    let code = getCode();
    fetchAccessToken(code);
    window.history.pushState("", "", redirect_uri); // remove param from url
}

function fetchAccessToken(code){
    let body = "grant_type=authorization_code";
    body += "&code=" + code; 
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + client_id;
    body += "&client_secret=" + client_secret;
    callAuthorizationApi(body);
}

function refreshAccessToken(){
    refresh_token = localStorage.getItem("refresh_token");
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + refresh_token;
    body += "&client_id=" + client_id;
    callAuthorizationApi(body);
}

function callAuthorizationApi(body){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ":" + client_secret));
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
}

function handleAuthorizationResponse(){
    if ( this.status == 200 ){
        var data = JSON.parse(this.responseText);
        console.log(data);
        var data = JSON.parse(this.responseText);
        if ( data.access_token != undefined ){
            access_token = data.access_token;
            // console.log(access_token);
            localStorage.setItem("access_token", access_token);
        }
        if ( data.refresh_token  != undefined ){
            refresh_token = data.refresh_token;
            localStorage.setItem("refresh_token", refresh_token);
        }
        onPageLoad();
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

function getCode(){
    let code = null;
    const queryString = window.location.search;
    if( queryString.length > 0){
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code')
    }
    return code;
}

function callApi(method, url, body, callback){
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
    xhr.send(body);
    xhr.onload = callback;
}

// User API Call
callApi( "GET", USER, null, handleUsersResponse );

function handleUsersResponse(){
    if( this.status == 200 ){
        var data_user = JSON.parse(this.responseText);
        console.log(data_user);
        const userimg = document.getElementById('userimg');
        const username = document.getElementById('username');
        const profileImg = document.querySelector('#profile-img');
        const profileName = document.querySelector('#profile-name');
        userimg.src = data_user.images[0].url;
        profileImg.src = data_user.images[0].url;
        profileName.textContent = data_user.display_name;
        username.textContent = data_user.display_name;

        // const PLAYLISTS = `https://api.spotify.com/v1/users/${data_user.id}/playlists?limit=10`;
        // callApi( "GET", PLAYLISTS, null, handlePlaylistsResponse );
        // console.log(data_user.images[0].url);
        const PLAYLISTS = `https://api.spotify.com/v1/users/${data_user.id}/playlists?limit=50`;
        callApi( "GET", PLAYLISTS, null, handlePlaylistsResponse );
    }
    else if ( this.status == 401 ){
        refreshAccessToken();
        // console.log('helloo3');
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

// Playlists API Call
function handlePlaylistsResponse(){
    if( this.status == 200 ){
        var data_playlists = JSON.parse(this.responseText);
        console.log(data_playlists);
        const container = document.getElementById('playlists');
        let adder = '';
        data_playlists.items.forEach( playlist_ => {
            adder+=`<li class="songItem">
            <div class="img_play">
                <img src="${playlist_.images[0].url}" alt="${playlist_.name}">
            </div>
            <h5><div class="play-name">${playlist_.name}</div>
                <br>
                <div class="subtitle">${playlist_.owner.display_name}</div>
            </h5>
        </li>`
        })
        container.innerHTML = adder;
    }
    else if ( this.status == 401 ){
        refreshAccessToken();
        // console.log('helloo3');
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

// Devices api call
callApi( "GET", DEVICES, null, handleDevicesResponse );

function handleDevicesResponse(){
    if ( this.status == 200 ){
        var data_devices = JSON.parse(this.responseText);
        console.log(data_devices);
        const devices = document.getElementById('devices');
        data_devices.devices.forEach( device_ => {
            let node = document.createElement('option');
            node.value = device_.id;
            node.innerHTML = device_.name;
            devices.appendChild(node);
        })
        // removeAllItems( "devices" );
        // data.devices.forEach(item => addDevice(item));
    }
    else if ( this.status == 401 ){
        refreshAccessToken()
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

// Followed Artists API Call
callApi( "GET", FOLLOWED_ARTISTS, null, handleFollowedArtistsResponse );

function handleFollowedArtistsResponse(){
    if( this.status == 200 ){
        var data_followartists = JSON.parse(this.responseText);
        console.log(data_followartists);

        const container = document.getElementById('artists');
        let adder = '';
        data_followartists.artists.items.forEach( artist_ => {
            adder+=`<li>
                        <img src="${artist_.images[0].url}" alt="${artist_.name}" title="${artist_.name}" id="${artist_.id}" onclick="artistClick('${artist_.id}')">
                        <div class="subtitle">${artist_.name}</div>
                    </li>`
            })
        container.innerHTML = adder;
    }
    else if ( this.status == 401 ){
        refreshAccessToken();
        // console.log('helloo3');
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

//saved-albums api call
callApi( "GET", SAVED_ALBUMS, null, handleSavedAlbumsResponse );

function handleSavedAlbumsResponse(){
    if( this.status == 200 ){
        var data_savedAlbums = JSON.parse(this.responseText);
        console.log(data_savedAlbums);

        const container = document.getElementById('albums');
        let adder = '';
        data_savedAlbums.items.forEach(album_ => {
            adder+=`<li class="songItem">
                        <div class="img_play">
                            <img src="${album_.album.images[0].url}" alt="${album_.album.artists[0].name}">
                        </div>
                        <h5>${album_.album.name}
                            <br>
                            <div class="subtitle">${album_.album.artists[0].name}</div>
                        </h5>
                    </li>`
        })
        container.innerHTML = adder;
        
    }
    else if ( this.status == 401 ){
        refreshAccessToken();
        // console.log('helloo3');
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

// liked-songs api call
callApi( "GET", LIKED_TRACKS, null, handleLikedTracksResponse );

function handleLikedTracksResponse(){
    if( this.status == 200 ){
        var data_likedTracks = JSON.parse(this.responseText);
        console.log(data_likedTracks);

        const container = document.getElementById('saved-tracks');
        let adder = '';
        data_likedTracks.items.forEach(song_ => {
            adder+=`<li class="songItem">
                        <div class="img_play">
                            <img src="${song_.track.album.images[0].url}" alt="${song_.track.name}">
                        </div>
                        <h5>${song_.track.name}
                            <br>
                            <div class="subtitle">${song_.track.artists[0].name}</div>
                        </h5>
                    </li>`
        })
        container.innerHTML = adder;
        
    }
    else if ( this.status == 401 ){
        refreshAccessToken();
        // console.log('helloo3');
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}