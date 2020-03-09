'use strict';
const socket = io();



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function Profile(code, name, age, gender, tobacco, quest1, quest2) {
    this.code = code;
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.tobacco = tobacco;
    this.question1 = quest1;
    this.question2 = quest2;
}

function ProfileComplete(profileCode, profile) {
    this.profileCode = profileCode;
    this.profile = profile;
}

const vm = new Vue({
    el: '#profileID',
    data: {
        tobacco: "",
        question1: "4",
        question2: "4",
        question3: "4",
        question4: "4",
        question5: "4",
        question6: "4",
    },
    methods: {
        profileDone: function() {
            if (confirm("Ãr du nöjd med dina svar?")) {
                let profile = new Profile(localStorage.getItem("code"), localStorage.getItem("name"), localStorage.getItem("age"), localStorage.getItem("gender"), this.tobacco, this.question1, this.question2)
                let profileComplete = new ProfileComplete(localStorage.getItem("code"), profile);
                socket.emit('addProfile', profileComplete);
                window.location.href = 'http://localhost:3000/user/waiting';
            }
        }
    }
})