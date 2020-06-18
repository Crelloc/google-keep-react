const express = require('express');
const path    = require('path');
const cluster = require('cluster');
const bodyParser = require('body-parser')
const numCPUs = require('os').cpus().length;
const isDev   = process.env.NODE_ENV !== 'production';
const PORT    = 5000;
let   notes   = [
    {
      id: 0,
      title: "Lorem ipsum",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus sit amet est placerat in egestas erat imperdiet. Diam sollicitudin tempor id eu nisl nunc. Placerat orci nulla pellentesque dignissim enim sit amet venenatis. Gravida arcu ac tortor dignissim."
    },
    {
      id: 1,
      title: "Lorem ipsum",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus sit amet est placerat in egestas erat imperdiet. Diam sollicitudin tempor id eu nisl nunc. Placerat orci nulla pellentesque dignissim enim sit amet venenatis. Gravida arcu ac tortor dignissim."
    }
  ]
// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();
  //Json headers
  app.use(bodyParser.json());
  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../build')));

  // Answer API requests.
  app.delete('/api/notes/:id', (request, response) => {
  	const id = Number(request.params.id);
	notes = notes.filter(note => note.id !== id);
	response.status(204).end();  
  });

  app.post('/api/notes', (request, response) => {
	const note = request.body;
  	note.id = notes.length;

  	notes.push(note);

  	response.json(note);
  });

  app.get('/api/notes/:id', (request, response) => {
  	const id = Number(request.params.id);
  	const note = notes.find(note => note.id === id);
  
  	if (note !== undefined) {
    		response.json(note);
  	} else {
    		response.status(404).end();
  	}
  });

  app.get('/api/notes', function (req, res) {
   /* res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
    */
    res.json(notes);
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  });
}
