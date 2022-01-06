import firebase from 'firebase';
import { FIREBASE_CONFIG } from '../config/Config';



export const app = firebase.initializeApp(FIREBASE_CONFIG);
export const auth = app.auth();
export const rtDb = app.database();
export const db = app.firestore();

db.enablePersistence().then(()=>{
    
}).catch(()=>{

});

