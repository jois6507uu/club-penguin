const vm = new Vue({
    el: '#contacts',
    data: {
    },
    methods: {
        done: function () {
            window.location.href = 'http://localhost:3000/user/Done';
        }
    }
})