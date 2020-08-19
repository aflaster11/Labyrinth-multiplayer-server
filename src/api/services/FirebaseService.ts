import * as firebase from "firebase/app";
import OAuthCredential = firebase.auth.OAuthCredential;

export const createUser = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    const user = await firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // ...
    });

    return res.send(user);
};

export const guestUser = async (req, res) => {
    const user = await firebase.auth().signInAnonymously().catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // ...
    });

    return res.send(user);
};

export const googleSignIn = async (req, res) => {
    let provider = new firebase.auth.GoogleAuthProvider();

    const user = firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // @ts-ignore
        let token = result.credential.accessToken;
        // The signed-in user info.
        let user = result.user;
        // ...
    }).catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;
        // ...
    });

    return res.send(user);
};