const vm = new Vue({
    el: '#profileID',
    data: {
        name: "",
        age: "",
        gender: "Man",
        //selectedFile: "",
    },
    methods: {
        //onFileSelected(event) {
        //  this.selectedFile = event.target.files[0]
        //console.log(this.selectedFile)
        //},
        loadFile: function(event) {
            var image = document.getElementById('output');
            image.src = URL.createObjectURL(event.target.files[0]);
        },
        profileDone: function() {
            if (confirm("Är du nöjd med dina svar?")) {
                let namn = this.name;
                let ålder = this.age;
                if (namn.length > 0 && ålder > 0) {
                    let kön = this.gender;
                    localStorage.setItem("name", namn);
                    localStorage.setItem("age", ålder);
                    localStorage.setItem("gender", kön);
                    localStorage.setItem("RoundNumber", 0);
                    window.location.href = 'http://localhost:3000/user/questions';
                } else {
                    alert("Vänligen fyll i alla rutor");
                }
            }

        }
    }
})