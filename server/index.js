import uuid from 'uuid';
import express from 'express';
import bodyParser from 'body-parser';
import dummyData from './data';

// Defining a port to use for this server.
const port = 4000;

// Defining an artificial wait time to simulate latency (ms).
const artificialWait = 0;

// Instantiating the framework and a router for our requests.
const app = express();
const router = express.Router(); // eslint-disable-line

// Adding middleare to parse incoming request bodies.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Associate the router with our application.
app.use(router);

// Handler for all requests. Responses are given CORS headers.
router.use((request, response, next) => {
    console.log('Request:', request.method.toUpperCase(), request.originalUrl);
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Route: Get all Todos.
router.get('/api/todo', (request, response) => {
    response.type('application/json');
    setTimeout(() => response.send(JSON.stringify(dummyData)), artificialWait);
});

// Route: Adding a Todo.
router.post('/api/todo', (request, response) => {
    request.body.id = uuid.v4();
    request.body.completed = false;

    dummyData.push(request.body);

    response.statusCode = 201;
    response.type('application/json');
    setTimeout(() => response.send(JSON.stringify(request.body)), artificialWait);
});

// Route: Updating a Todo.
router.put('/api/todo/:id', (request, response) => {
    let todo = dummyData.find(function(record) {
        return record.id === request.params.id;
    });

    const acceptedKeys = ['completed', 'text'];

    for (var key in request.body) {
        if (acceptedKeys.includes(key)) {
            todo[key] = request.body[key];
        }
    }

    response.type('application/json');
    setTimeout(() => response.send(JSON.stringify(todo)), artificialWait);
});

// Route: Deleting a Todo.
router.delete('/api/todo/:id', (request, response) => {
    const todoIndex = dummyData.findIndex(function(record) {
        return record.id === request.params.id;
    });

    if (todoIndex === -1) {
        response.statusCode = 204;
        response.send();
        return;
    }

    const todo = dummyData.splice(todoIndex, 1)[0];

    response.type('application/json');
    setTimeout(() => response.send(JSON.stringify(todo)), artificialWait);
});

// Debugging to the console that the server has started.
console.log(`Mock Server: http://localhost:${port}/`);

// Starting to listen for the routes above.
app.listen(port);
