<<<<<<< HEAD
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("doneButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// When the user clicks on the button, open the modal
btn.onclick = async function () {
    modal.style.display = "block";
    await sleep(10000);
    console.log("v�ntat 10 sek");
    window.location.href = 'http://localhost:3000/user/round';
}
=======
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
            if(confirm("Är du nöjd med dina svar?"))
            {
            localStorage.setItem("tobacco", this.tobacco);
            localStorage.setItem("question1", this.question1);
            localStorage.setItem("question2", this.question2);
            window.location = 'http://localhost:3000/user/waiting';
            }

        }
    }
})
>>>>>>> c474957d2b65783c77c4a8e980248588a57179d3
