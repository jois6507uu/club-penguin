const vm = new Vue({
    el: '#contacts',
    data: {
        contact1: "Nej",
        contact2: "Nej"
    },
    methods: {
        contactsAnswered: function() {
            window.location.href = 'http://localhost:3000/user/Done';
        }
    }
})