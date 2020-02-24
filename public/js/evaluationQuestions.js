const vm = new Vue({
    el: '#profileID',
    data: {
        fraga1: '',
        fraga2: ''
    },
    methods: {
        evaluationDone: function() {

            localStorage.setItem("fraga1", this.fraga1);
            localStorage.setItem("fraga2", this.fraga2);
            console.log(localStorage.getItem("fraga1"));
            console.log(localStorage.getItem("fraga2"));
            window.location = 'http://localhost:3000/user/meeting'; //how do we make it run 3 times? loop but where?

        }
    }
})