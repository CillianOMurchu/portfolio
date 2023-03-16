import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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
const db = getFirestore(app);

const users = async (dataBase) => {
  const usersCol = collection(dataBase, 'users');
  const userSnapshot = await getDocs(usersCol);
  const userList = userSnapshot.docs.map((doc) => doc.data());
  return userList;
};

export const getUsers = () => {
  const usersStored = JSON.parse(localStorage.getItem('users'));

  if (!usersStored) {
    users(db).then((res) => {
      console.log('no users stored, calling with database now');
      localStorage.setItem('users', JSON.stringify(res));
    });
  }
};
