'use strict';
const socket = io();


function questionsComplete(profileCode, roundNumber, questions) {
    this.profileCode = profileCode;
    this.roundNumber = parseInt(roundNumber);
    this.questions = questions;
}

const vm = new Vue({
    el: '#profileID',
    data: {
        fraga1: "4",
        fraga2: "4"
    },
    methods: {
        evaluationDone: function () {
            localStorage.setItem("RoundNumber", parseInt(localStorage.getItem("RoundNumber")) + 1);
            console.log(localStorage.getItem("RoundNumber"));
            let dateQuestionsObj = [this.fraga1, this.fraga2];
            let Questions = new questionsComplete(localStorage.getItem("code"), localStorage.getItem("RoundNumber"), dateQuestionsObj);
            socket.emit('addQuestions', Questions);
            window.location.href = 'http://localhost:3000/user/contacts';

        }
    }
})
