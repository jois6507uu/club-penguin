'use strict';
const socket = io();

function DateQuestions(quest1, quest2) {
    this.question1 = quest1;
    this.question2 = quest2;
}

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
            let dateQuestionsObj = new DateQuestions(this.fraga1, this.fraga2);
            let Questions = new questionsComplete(localStorage.getItem("code"), localStorage.getItem("RoundNumber"), dateQuestionsObj);
            socket.emit('addQuestions', Questions);
            socket.emit('readyWithQuestions', parseInt(localStorage.getItem("code"), 10));
            window.location.href = 'http://localhost:3000/user/contacts';

        }
    }
})
