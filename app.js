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
app.use('/vue',
  express.static(path.join(__dirname, '/node_modules/vue/dist/')));
// Serve index.html directly as root page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});


app.get('/user/profile', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/user/ProfileMaking/profile.html'));
});

app.get('/user/questions', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/user/ProfileMaking/questions.html'));
});

app.get('/user/AfterDateQuest', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/user/RunningEvent/AfterDateQuestions.html'));
});

app.get('/user/contacts', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/user/AfterEvent/contacts.html'));
});

app.get('/user/contactsRec', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/user/AfterEvent/contactsRecive.html'));
});

app.get('/user/Done', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/user/AfterEvent/done.html'));
});


app.get('/admin/start', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/admin/adminstart.html'));
});

app.get('/admin/eventview', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/admin/eventview.html'));
});

function AdminUser() {
    this.adminuser = {};
}

AdminUser.prototype.checkLogin = function(username, password) {
    console.log("checking login");
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
/*
AdminUser.prototype.loadAdminProfile = function(username) {
    let data = fs.readFileSync('database/admin/' + username + '/info.json', 'utf8', function(err) {
	if (err) {
            throw err;
	}
    });

    data = JSON.parse(data);
    return data;
}
*/
const adminuser = new AdminUser();


function Event() {
    this.event = {};
}

Event.prototype.addEvent = function(event) {
    console.log("writing to file");
    let eventJSON = JSON.stringify(event);
    fs.writeFileSync('database/admin/admin/' + event.eventName + '.json', eventJSON, 'utf8', function(error) {
	if(error) {
	    console.log('Could not write to file: ' + event.eventName + '.json');
	}
    });
}

const event = new Event();

io.on('connection', function(socket) {
    // Send list of orders when a client connects
    socket.emit('initialize', {  });
    
    socket.on('checkLogin', function(username, password) {
	
	if (adminuser.checkLogin(username, password)) {
	    console.log('correct login');
	    socket.emit('adminLoginRes', true);
	} else {
	    console.log('invalid login');
	    socket.emit('adminLoginRes', false);
	}
	
    });
    /*
    socket.on('loadAdminProfile', function (username) {
	socket.emit('getAdminProfile', adminuser.loadAdminProfile(username));
    });
    */
    
    // When a connected client emits an "addOrder" message
    socket.on('addEvent', function(newEvent) {
	event.addEvent(newEvent);
	// send updated info to all connected clients,
	// note the use of io instead of socket
	io.emit('currentQueue', {  });
    });
    
});



/* eslint-disable-next-line no-unused-vars */
const server = http.listen(app.get('port'), function() {
  console.log('Server listening on port ' + app.get('port'));
});
