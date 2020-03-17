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

app.get('/user/waiting', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/user/DuringEvent/waiting.html'));
});

app.get('/user/meeting', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/user/DuringEvent/meeting.html'));
});

app.get('/user/dating', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/user/DuringEvent/dating.html'));
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

User.prototype.addQuestions = function (code, questions) {
    console.log("writing to file");
    let users = JSON.parse(fs.readFileSync('database/users/users.json', function (error) {
        if (err) {
            throw err;
        }
    }));
    users[code]["questions" + users["roundNumber"]] = questions;
    let questionsJSON = JSON.stringify(users, null, 2); //null och 2 är bara för att allt inte ska stå på en enda rad i json filen
    fs.writeFileSync('database/users/users.json', questionsJSON, function (error) {
        if (err) {
            console.log('Could not write to file ' + code + '.json');
        }
    });
    return users["roundNumber"];
}

User.prototype.getUsers = function () {
    let users = fs.readFileSync('database/users/users.json', function(error) {
        if (error) {
            throw error;
        }
    });

    return JSON.parse(users);
}


User.prototype.getDateCodes = function (userCode) {
    let users = fs.readFileSync('database/users/users.json', function(error) {
        if (error) {
            throw error;
        }
    });

    let parsedUsers = JSON.parse(users);
    let activeUser = parsedUsers[userCode];
    
    return [activeUser["profile"]["dateCode1"], activeUser["profile"]["dateCode2"], activeUser["profile"]["dateCode3"]];
}

User.prototype.getUserName = function (userCode) {
     let users = fs.readFileSync('database/users/users.json', function(error) {
        if (error) {
            throw error;
        }
    });

    let parsedUsers = JSON.parse(users);
    let activeUser = parsedUsers[userCode];

    return activeUser["profile"]["name"];
}


User.prototype.getSharedContacts = function (userCode) {
    let users = JSON.parse(fs.readFileSync('database/users/users.json', function (error) {
        if (err) {
            throw err;
        }
    }));

    return users[userCode]["sharedUsers"];
}

User.prototype.getDateNamesFromUserCode = function (userCode, roundNumber) {
    let users = JSON.parse(fs.readFileSync('database/users/users.json', function (error) {
        if (err) {
            throw err;
        }
    }));

    let dateCodes = [];
    for (let i = 1; i < 4; ++i) {
	if (users[userCode]["profile"]["dateCode" + i]) {
	    dateCodes.push(users[userCode]["profile"]["dateCode" + i]);
	}
    }
    let dateNames = [];
    for (let index in dateCodes) {
	dateNames.push(users[dateCodes[index]]["profile"]["name"]);
    }
    console.log(dateNames);
    return dateNames;
}

User.prototype.setRoundNumber = function (roundNumber) {
    let users = JSON.parse(fs.readFileSync('database/users/users.json', function (error) {
        if (err) {
            throw err;
        }
    }));
    users["roundNumber"] = roundNumber;
    let profileJSON = JSON.stringify(users, null, 2); //null och 2 är bara för att allt inte ska stå på en enda rad i json filen
    fs.writeFileSync('database/users/users.json', profileJSON, function(error) {
	if (err) {
	    console.log('Could not write to file ' + user.userCode + '.json');
	}
    });
}

User.prototype.shareCode = function (dateCode, userCode) {
    let users = JSON.parse(fs.readFileSync('database/users/users.json', function (error) {
        if (err) {
            throw err;
        }
    }));
    if (users[dateCode].sharedUsers) {
	if (!users[dateCode].sharedUsers.includes(userCode)) {
	    users[dateCode].sharedUsers.push(userCode);
	}
    } else {
	users[dateCode].sharedUsers = [userCode];
    }

    let updatedJSON = JSON.stringify(users, null, 2);

    fs.writeFileSync('database/users/users.json', updatedJSON, function (error) {
        if (err) {
            console.log('Could not write to file ' + user.userCode + '.json');
        }
    });
    
}

function dateData(table, dateName, code) {
    this.table = table;
    this.dateName = dateName;
    this.code = code;
}

function getDateDataFunc(code) {
    let users = JSON.parse(fs.readFileSync('database/users/users.json', function (error) {
        if (err) {
	    throw err;
        }
    }));
    console.log("test");
    let data = new dateData(users[code].profile.table, users[code].profile.dateName, users[code].profile.code);
    return data;
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

    socket.on('addQuestions', function (code, questions) {
        let roundNumber = user.addQuestions(code, questions);
	socket.emit('roundNumberReturn', roundNumber);
    });

    socket.on('getUsers', function() {
        let users = user.getUsers();
        socket.emit('profileDataResponse', users);
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

    socket.on('getDateCodes', function(userCode) {
	let dateCodes = user.getDateCodes(userCode);
	socket.emit('dateCodeResponse', dateCodes);
    });

    socket.on('getUserName', function(userCode) {
	let name = user.getUserName(userCode);
	socket.emit('userNameResponse', name);
    });

    socket.on('getDateNamesFromDateCodes', function(userCode) {
	let dateName = user.getDateNamesFromUserCode(userCode);
	socket.emit('dateNamesResponse', dateName);
    });

    socket.on('getSharedContacts', function(userCode) {
	let sharedContacts = user.getSharedContacts(userCode);
	console.log("inside getSharedContacts");
	io.sockets.emit('sharedContactsResponse', sharedContacts);
    });


    socket.on('getUserData', function(userCode) {
	let users = user.getUsers();
	console.log(users["roundNumber"]);
	socket.emit('userDataResponse', users[userCode], users["roundNumber"]);

    });
    
    socket.on('getDateData', function (code) {
        let data = getDateDataFunc(code);
        socket.emit('returnDateData', data);
    });

    socket.on('shareMyCode', function(dateCode, userCode) {
	user.shareCode(dateCode, userCode);
    });

    socket.on('setRoundNumber', function(roundNumber) {
	console.log("roundNumber is " + roundNumber);
	user.setRoundNumber(roundNumber);
    });
    
});



/* eslint-disable-next-line no-unused-vars */
const server = http.listen(app.get('port'), function() {
    console.log('Server listening on port ' + app.get('port'));
});
