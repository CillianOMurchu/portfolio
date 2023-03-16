import Route from '@ember/routing/route';
import { getUsers } from '../firebase/firebase';

const storageUsers = JSON.parse(localStorage.getItem('users'));
console.log('storageUsers is ', storageUsers);
if (!storageUsers) {
  getUsers();
}

export default class HomeRoute extends Route {
  model() {
    console.log('The model hook for home just ran!');
    return 'Hello Ember!';
  }
}
