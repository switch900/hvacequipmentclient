import { BehaviorSubject } from 'rxjs';

import { handleResponse } from '../_helpers/handle-response';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value }
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ username, password })
    };

    return fetch('https://andrewhewitson.com/auth/login', requestOptions)
        // .then(res => res.json()).then(res => {
        //     localStorage.setItem('currentUser', JSON.stringify(res));
        // })
        // .then(res => {
        //     alert(res);
        //     // store user details and jwt token in local storage to keep user logged in between page refreshes
        //     localStorage.setItem('currentUser', JSON.stringify(res));
        //     currentUserSubject.next(res);
        //     return res;
        // })
        // .then(handleResponse)
        // .then(alert("Welcome to the Naughty or Nice list "))
        .then(res => res.json()).then(res => {
            localStorage.setItem('currentUser', JSON.stringify(res));
            currentUserSubject.next(res);

            if (res.token) {
                alert("Welcome to the HVAC Project");
                window.location.href = '/';
                // if (localStorage.getItem('credentials') === "Admin") {
                //     window.location.href = '/list';
                // }
                // else if (localStorage.getItem('credentials') === "Child") {
                //     window.location.href = '/detail/' + localStorage.getItem('id');
                // }
                // else {
                //     alert("Nothing Found");
                // }
            }
            else {
                alert("Not a valid user or password");
            }
        }, function (error) {
            console.log(error.message); //=> String
        })
        .then(handleResponse)
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}