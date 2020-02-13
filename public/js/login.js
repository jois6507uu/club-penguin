
let hasErrorMsg = false;

let userInput = document.getElementById('userInput');
let userLogin = document.getElementById('userLogin');
let preGenUserCodes = [129,123,234,765];


function loginUser() {
    for (let code of preGenUserCodes) {
	if (userInput.value == code) {
	    // goto next page'
	    window.location.href = "http://localhost:3000/user";
	    return;
	}
    }

    if (!hasErrorMsg) {
	
	let errorMsg = document.createElement('p');
	let errorTxt = document.createTextNode("Ogiltig kod!")

	errorMsg.className = "errorMessage";
	
	errorMsg.appendChild(errorTxt);
	userLogin.appendChild(errorMsg);

	hasErrorMsg = true;
    }

    userInput.value = "";

}

