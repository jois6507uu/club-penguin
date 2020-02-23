console.log(localStorage.getItem("name"));
console.log(localStorage.getItem("age"));
console.log(localStorage.getItem("gender"));

const vm = new Vue({
    el: '#profileID',
    data: {
        tobacco: "",
        question1: "",
        question2: "",
    },
    methods: {
        profileDone: function () {

            localStorage.setItem("tobacco", this.tobacco);
            localStorage.setItem("question1", this.question1);
            localStorage.setItem("question2", this.question2);
            window.location = 'http://localhost:3000/user/DuringEvent/waiting';

        }
    }
})
