'use strict';
const socket = io();

const vm = new Vue({
    el: '#profileID',
    data: {
        fraga1: "4",
        fraga2: "4"
    },
    methods: {
        evaluationDone: function () {
            let dateQuestions = [this.fraga1, this.fraga2];
            socket.emit('addQuestions', localStorage.getItem("code"), dateQuestions);
	    socket.on('roundNumberReturn', function(roundNumber) {
		if (roundNumber < 3) {
                    window.location.href = 'http://localhost:3000/user/waiting';
		} else {
                    window.location.href = 'http://localhost:3000/user/contacts';
		}
	    });
        }
    }
})
