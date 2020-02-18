
function initEventView() {

   
    
    initTables();
    initUsers();
    
}

function initTables() {
    let view = document.getElementById('mainView');
    for (let i = 0; i < 10; ++i) {
	createTableContainer(view);
    }
}

function initUsers() {
    let view = document.getElementById('sidebar');
    for (let i = 0; i < 20; ++i) {
	createUserContainer(view);
    }
    
}

function createTableContainer(view) {
    let container = document.createElement('div');
    container.setAttribute('class', 'table');
    view.appendChild(container);
}

function createUserContainer(view) {
    let container = document.createElement('div');
    container.setAttribute('class', 'user');
    view.appendChild(container);
}
