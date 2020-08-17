import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import * as firebase from "firebase/app";
import "firebase/auth";
import {Logger} from "../lib/logger";

const log = new Logger(__dirname);

export const firebaseLoader : MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    let firebaseConfig = {
        apiKey: "AIzaSyBbvYGKMHLBLiM12oFkJYyfGurk-S5VnMM",
        authDomain: "labyrinth-5ac8e.firebaseapp.com",
        databaseURL: "https://labyrinth-5ac8e.firebaseio.com",
        projectId: "labyrinth-5ac8e",
        storageBucket: "labyrinth-5ac8e.appspot.com",
        messagingSenderId: "245616945732",
        appId: "1:245616945732:web:6c63f7bc926162b5bd2a11",
        measurementId: "G-3R0G8NKRES"

    };

    firebase.initializeApp(firebaseConfig);
    log.info("Firebase is initialized");
    if (settings) {
        settings.setData('firebase', firebase);
    }
};
