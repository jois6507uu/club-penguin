'use strict';
const socket = io();



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function Profile(code, name, age, phoneNr, gender, tobacco, profileQuestions) {
    this.code = code;
    this.name = name;
    this.age = age;
    this.phoneNr = phoneNr;
    this.gender = gender;
    this.tobacco = tobacco;
    this.profileQuestions = profileQuestions;
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
		        let profileQuestions = [this.question1, this.question2, this.question3, this.question4, this.question5, this.question6];
                let profile = new Profile(localStorage.getItem("code"), localStorage.getItem("name"), localStorage.getItem("age"), localStorage.getItem("PhoneNr"), localStorage.getItem("gender"), this.tobacco, profileQuestions);
                let profileComplete = new ProfileComplete(localStorage.getItem("code"), profile);
                socket.emit('addProfile', profileComplete);
                window.location.href = 'http://localhost:3000/user/waiting';
            }
        }
    }
})
