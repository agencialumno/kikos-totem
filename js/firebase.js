const firebaseConfig = {
  apiKey: "AIzaSyBFfhWaKYGYvGrHar28z_iyPVM0poFk5t8",
  authDomain: "kikos-totem.firebaseapp.com",
  projectId: "kikos-totem",
  storageBucket: "kikos-totem.firebasestorage.app",
  messagingSenderId: "115982751701",
  appId: "1:115982751701:web:03450f132e6fa1ee788f5c"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();