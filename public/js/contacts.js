const vm = new Vue({
    el: '#contacts',
    data: {
        contact1: "Nej",
        contact2: "Nej"
    },
    methods: {
        contactsAnswered: function() {
            window.location.href = 'http://192.168.43.40:3000/user/Done';
        }
    }
})