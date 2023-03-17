import Route from '@ember/routing/route';
import { getUsers } from '../firebase/firebase';
import ENV from 'portfolio/config/environment';

const storageUsers = JSON.parse(localStorage.getItem('users'));
console.log('storageUsers is ', storageUsers);
if (!storageUsers) {
  getUsers();
}

export default class HomeRoute extends Route {
  async model() {
    // connect to spotify
    // const handleLogin = () => {
    window.location = `${ENV.SPOTIFY_AUTHORIZE_URL}?client_id=${ENV.SPOTIFY_CLIENT_ID}&redirect_uri=${ENV.SPOTIFY_REDIRECT_URL}&response_type=token&show_dialog=true`;
    // };
    // console.log('running in model callback');
    // const baseUrl = `https://api.spotify.com/`;
    // const headers = {
    // };
    // fetch(baseUrl, headers)
    //   .then((res) => res.json())
    //   .then((json) => console.log('data is ', json));
    // const tunesInfo = await response.json();
    // console.log('tunesInfo is ', tunesInfo);
    // return { tunesInfo };
  }
}
