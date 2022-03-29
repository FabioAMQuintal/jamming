/*
    NOTE
        Spotify API is free of charge. The purpose of this project is to create a React app which consume data from a 3rd party API.
        However, it's not safe to keep secret variables in React, since it's build which all values, I've had my secret here only for a portfolio purpose.
        I don't know how to keep information safe without a backend, so, for this project, I'm aware that this is not safe and much less a software pattern
*/

let accessToken;
const clientId = '778c030e11cb46bd883d6aa5ab468a09'
const redirectUri = 'http://localhost:3000/';

const Spotify = {

    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        console.log(process.env.REACT_APP_ID);

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            //clear parameters, to grab a new token when it expires
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');

            return accessToken;
        } else {

            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
            window.location = accessUrl;
        }
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, 
        { headers: {
            Authorization: `Bearer ${accessToken}`
        }})
        .then(response => response.json())
        .then(jsonResponse => {
            if(!jsonResponse.tracks){
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }))
        })
    },

    savePlayList(name, trackUris) {
        if(!name || !trackUris.length){
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}`};
        let userId;

        return fetch('https://api.spotify.com/v1/me', {headers: headers})
        .then(response => response.json())
        .then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, 
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: name})
            })
            .then(response => response.json())
            .then(jsonResponse => {
                const playlistId = jsonResponse.id
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ uris: trackUris})
                })
            })
        })
    }

}

export default Spotify;