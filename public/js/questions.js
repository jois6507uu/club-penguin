function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


console.log(localStorage.getItem("name"));
console.log(localStorage.getItem("age"));
console.log(localStorage.getItem("gender"));

const vm = new Vue({
    el: '#profileID',
    data: {
        tobacco: "",
        question1: "4",
        question2: "4",
        question3: "4",
        question4: "4",
        question5: "4",
        question6: "4",
    },
    methods: {
        profileDone: async function() {
            if (confirm("Ãr du nöjd med dina svar?")) {
                localStorage.setItem("tobacco", this.tobacco);
                localStorage.setItem("question1", this.question1);
                localStorage.setItem("question2", this.question2);
                localStorage.setItem("question3", this.question3);
                localStorage.setItem("question4", this.question4);
                localStorage.setItem("question5", this.question5);
                localStorage.setItem("question6", this.question6);
                console.log("väntat 10 sek");
                // Get the modal
                var modal = document.getElementById("myModal");

                // Get the button that opens the modal
                var btn = document.getElementById("doneButton");

                // Get the <span> element that closes the modal
                var span = document.getElementsByClassName("close")[0];

                modal.style.display = "block";
                await sleep(10000);
                console.log("väntat 10 sek");
                window.location.href = 'http://localhost:3000/user/meeting';
            }
        }
    }
})