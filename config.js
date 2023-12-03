import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import 'firebase/compat/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCb6SQsWiL3_9a31XsocwKrAV0lAbQ2Hec",
    authDomain: "download-11bb7.firebaseapp.com",
    projectId: "download-11bb7",
    storageBucket: "download-11bb7.appspot.com",
    messagingSenderId: "75629344872",
    appId: "1:75629344872:web:fd2d6ea7b1bed71e8923dd",
    measurementId: "G-1NETQ9YK2T"
}

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export {firebase};
