const vm = new Vue({
    el: '#afterDateQuest',
    data: {
        fraga1: 4,
        fraga2: 4
    },
    methods: {
        questionAnswered: function () {
                window.location.href = 'http://localhost:3000/user/contacts';
        }
    }
})