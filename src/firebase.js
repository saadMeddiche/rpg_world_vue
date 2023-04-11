//https://www.youtube.com/watch?v=72Fk9i9HcZM
//https://console.firebase.google.com/u/0/project/rpg-world-9c5dc/database/rpg-world-9c5dc-default-rtdb/data
import test from 'firebase/compat/app' ;
import 'firebase/compat/database';


const database = test.initializeApp({
    
    apiKey: "AIzaSyBQdsly58SmLXkgzEa47PtijYVPox9_3-U",
    authDomain: "rpg-world-9c5dc.firebaseapp.com",
    projectId: "rpg-world-9c5dc",
    storageBucket: "rpg-world-9c5dc.appspot.com",
    messagingSenderId: "176562738080",
    appId: "1:176562738080:web:ccb6b4bc754187fdd74ac5"
    
})

export default database;