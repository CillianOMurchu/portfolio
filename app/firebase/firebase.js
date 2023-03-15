import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAZsfeXfy4WUVIrTIxKS40jgMuSAZ-9k-w',
  authDomain: 'portfolio-812b4.firebaseapp.com',
  projectId: 'portfolio-812b4',
  storageBucket: 'portfolio-812b4.appspot.com',
  messagingSenderId: '1078333527988',
  appId: '1:1078333527988:web:ff6bc779df715ab51584e1',
  measurementId: 'G-H94CFX2WJ2',
};

const app = initializeApp(firebaseConfig);
console.log('app is ', app);
