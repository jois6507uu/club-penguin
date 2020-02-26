document.body.onload = addElement;

function addElement() {
    // create a new div element 
    var newDiv = document.createElement("p");
    // and give it some content 
    if (localStorage.getItem("contact1") == "Ja"){
        var newContent = document.createTextNode("Kontaktinfo för person 1: ");
        // add the text node to the newly created div
        newDiv.appendChild(newContent);
    } 
    if (localStorage.getItem("contact2") == "Ja"){
        var newContent = document.createTextNode("Kontaktinfo för person 2: ");
        // add the text node to the newly created div
        newDiv.appendChild(newContent);
    }
    if (localStorage.getItem("contact2") == "Nej" && localStorage.getItem("contact1") == "Nej" ){
        var newContent = document.createTextNode("Ingen kontaktinformation att visa");
        // add the text node to the newly created div
        newDiv.appendChild(newContent);
    } 
    // add the newly created element and its content into the DOM 
    var currentDiv = document.getElementById("info");
    currentDiv.appendChild(newDiv);
}

const vm = new Vue({
    el: '#contacts',
    data: {
    },
    methods: {
        done: function () {
            window.location.href = 'http://192.168.43.40:3000/user/Done';
        }
    }
})
