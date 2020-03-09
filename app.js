/* jslint node: true */
/* eslint-env node */
'use strict';

// Require express, socket.io, and vue
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');


const send = require('send'); //added
const fs = require('fs'); //added

// Pick arbitrary port for server
const port = 3000;
app.set('port', (process.env.PORT || port));

// Serve static assets from public/
app.use(express.static(path.join(__dirname, 'public/')));
// Serve vue from node_modules as vue/
app.use('/vue',	express.static(path.join(__dirname, '/node_modules/vue/dist/')));

//----------------------------HÄR SÄTTER MAN SIDOR-------------------------------
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/user/profile', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/user/ProfileMaking/profile.html'));
});

app.get('/user/questions', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/user/ProfileMaking/questions.html'));
});
/*
app.get('/user/Round', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/user/DuringEvent/DuringRound.html'));
});
*/
app.get('/user/waiting', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/user/DuringEvent/waiting.html'));
});

app.get('/user/meeting', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/user/DuringEvent/meeting.html'));
});

app.get('/user/round', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/user/DuringEvent/roundTimer.html'));
});

app.get('/user/evaluationQuestions', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/user/DuringEvent/evaluationQuestions.html'));
});

app.get('/user/contacts', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/user/AfterEvent/contacts.html'));
});

app.get('/user/contactsRec', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/user/AfterEvent/contactsRecive.html'));
});

app.get('/user/Done', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/user/AfterEvent/done.html'));
});


app.get('/admin/start', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/admin/adminstart.html'));
});

app.get('/admin/eventview', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/admin/eventview.html'));
});

//-------------------------------------------------------------------------
//-------------------------------------------------------------------------

const adminuser = new AdminUser();

function AdminUser() {
    this.adminuser = {};
}

AdminUser.prototype.checkLogin = function(username, password) {
    console.log("checking login");
    // readFileSync verkar blockera signaler för andra server requests, om vi stöter på problem så kan vi ändra till vanlig readFile
    let data = fs.readFileSync('database/admin/users.json', 'utf8', function(err) {
        if (err) {
            throw err;
        }
    });

    data = JSON.parse(data);

    for (let user in data.users) {
        if (username == data.users[user].username && password == data.users[user].password) {
            return true;
        }
    }
    return false;
}

const event = new Event();

function Event() {
    this.event = {};
}

Event.prototype.addEvent = function(event) {
    console.log("writing event to new file");
    let codesJSON = JSON.stringify(event.userArray);
    let eventJSON = JSON.stringify(event);
    fs.writeFileSync('database/admin/admin/' + event.eventName + '.json', eventJSON, 'utf8', function(error) {
        if (error) {
            console.log('Could not write to file: ' + event.eventName + '.json');
        }
    });
    fs.writeFileSync('database/users/allActiveCodes.json', codesJSON, 'utf8', function(error) {
	if (error) {
	    console.log('Cound not write to file: allActiveCodes.json');
	}
    });
}

Event.prototype.getEventData = function(eventname) {
    console.log("reading data from " + eventname + ".json");
    let data = fs.readFileSync('database/admin/admin/' + eventname + ".json", 'utf8', function(error) {
        if (err) {
            throw err;
        }
    });
    data = JSON.parse(data);
    return data;
}

Event.prototype.removeUserData = function(eventname) {

    let emptyJSON = { 
    };

    let emptyArray = "[]";
    
    fs.writeFileSync('database/users/users.json', JSON.stringify(emptyJSON), function(error) {
	if (err) {
	    console.log('Could not clear file ' + user.userCode + '.json');
	}
    });

    fs.writeFileSync('database/users/allActiveCodes.json', emptyArray, function(error) {
	if (err) {
	    console.log('Could not clear file allActiveCodes.json');
	}
    });

    fs.unlinkSync('database/admin/admin/' + eventname + '.json', function(error) {
	if (err) {
	    console.log('Could not delete file ' + eventname + '.json');
	}
    });
}

const user = new User();

function User() {
    this.user = {};
}

User.prototype.addUser = function(user) {
    console.log("writing user to user.json file");
    let users = JSON.parse(fs.readFileSync('database/users/users.json', function(error) {
	if (err) {
	    throw err;
	}
    }));
    users[user.userCode] = ""; //kommer inte på ett bättre sätt att göra detta på
    let userJSON = JSON.stringify(users, null, 2); //null och 2 är bara för att allt inte ska stå på en enda rad i json filen
    fs.writeFileSync('database/users/users.json', userJSON, function(error) {
	if (err) {
	    console.log('Could not write to file ' + user.userCode + '.json');
	}
    });
}

User.prototype.addProfile = function (profile) {
    console.log("writing to file");
    let users = JSON.parse(fs.readFileSync('database/users/users.json', function(error) {
	if (err) {
	    throw err;
	}
    }));
    var myObject = new Object();
    myObject.profile = profile.profile;
    users[profile.profileCode] = myObject;
    let profileJSON = JSON.stringify(users, null, 2); //null och 2 är bara för att allt inte ska stå på en enda rad i json filen
    fs.writeFileSync('database/users/users.json', profileJSON, function(error) {
	if (err) {
	    console.log('Could not write to file ' + user.userCode + '.json');
	}
    });
}

User.prototype.addQuestions = function (questions) {
    console.log("writing to file");
    let users = JSON.parse(fs.readFileSync('database/users/users.json', function (error) {
        if (err) {
            throw err;
        }
    }));
    console.log(questions.roundNumber);
    if (questions.roundNumber == 1) {
        users[questions.profileCode].questions1 = questions.questions;
    } else if (questions.roundNumber == 2) {
        users[questions.profileCode].questions2 = questions.questions;
    } else {
        users[questions.profileCode].questions3 = questions.questions;
    }
    console.log(users[questions.profileCode]);
    let questionsJSON = JSON.stringify(users, null, 2); //null och 2 är bara för att allt inte ska stå på en enda rad i json filen
    fs.writeFileSync('database/users/users.json', questionsJSON, function (error) {
        if (err) {
            console.log('Could not write to file ' + user.userCode + '.json');
        }
    });
}

User.prototype.getUsers = function () {
    let users = fs.readFileSync('database/users/users.json', function(error) {
        if (error) {
            throw error;
        }
    });

    return JSON.parse(users);
}


function getUserCodes() {
    let array = fs.readFileSync('database/users/allActiveCodes.json', 'utf8', function(error) {
	if (err) {
	    throw err;
	}
    });
    return JSON.parse(array);
}



////////////////////////////////////////// SOCKET.ON HÄR ////////////////////////////////
io.on('connection', function(socket) {
    socket.emit('initialize', {});

    socket.on('checkLogin', function(username, password) {

        if (adminuser.checkLogin(username, password)) {
            console.log('correct login');
            socket.emit('adminLoginRes', true);
        } else {
            console.log('invalid login');
            socket.emit('adminLoginRes', false);
        }
    });


    socket.on('getEventData', function(eventname) {
        let eventData = event.getEventData(eventname);
        socket.emit('eventDataResponse', eventData);
    });

    socket.on('addEvent', function(newEvent) {
        event.addEvent(newEvent);
    });

    socket.on('addUser', function(newUser) {
        user.addUser(newUser);
    });

    socket.on('getUserCodes', function() {
	let userCodes = getUserCodes();
	socket.emit('returnUserCodes', userCodes);
    });

    socket.on('addProfile', function (newProfile) {
        user.addProfile(newProfile);
        io.sockets.emit('newUserCreated', newProfile);
    });

    socket.on('addQuestions', function (questions) {
        user.addQuestions(questions);
    });

    socket.on('getUsers', function() {
        let users = user.getUsers();
        socket.emit('profileDataResponse', users);
	console.log(users);
    });

    socket.on('removeUserData', function(eventname) {
	event.removeUserData(eventname);
    });

    socket.on('pingUserRoundInfo', function() {
	io.sockets.emit('userPingRoundReady');
    });

    socket.on('pingUserRoundStart', function() {
	io.sockets.emit('userPingRoundStart');
    });
});



/* eslint-disable-next-line no-unused-vars */
const server = http.listen(app.get('port'), function() {
    console.log('Server listening on port ' + app.get('port'));
});
