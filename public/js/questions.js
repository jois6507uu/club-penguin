'use strict';
const socket = io();


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function Profile(name, age, gender, tobacco, quest1, quest2) {
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

let profileArr = [localStorage.getItem("name"), localStorage.getItem("age"), localStorage.getItem("gender")]
console.log(profileArr);

const vm = new Vue({
    el: '#profileID',
    data: {
        tobacco: "",
        question1: "4",
        question2: "4",
    },
    methods: {
        profileDone: function() {
            if(confirm("Ãr du nöjd med dina svar?"))
            {
                let profile = new Profile(localStorage.getItem("name"), localStorage.getItem("age"), localStorage.getItem("gender"), this.tobacco, this.question1, this.question2)
                let profileComplete = new ProfileComplete(localStorage.getItem("code"), profile);
                socket.emit('addProfile', profileComplete);
                // Get the modal
               /* var modal = document.getElementById("myModal");
            modal.style.display = "block";
            await sleep(10000);
            console.log("väntat 10 sek");
            window.location.href = 'http://localhost:3000/user/meeting';
            */
            }
        }
    }
})
