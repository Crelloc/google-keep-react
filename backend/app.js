require("dotenv").config();
const express = require("express");
// const helmet = require("helmet");
const path = require("path");
const cluster = require("cluster");
// const bodyParser = require("body-parser");
const Note = require("./models/note");

const numCPUs = require("os").cpus().length;
const isDev = process.env.NODE_ENV !== "production";
const PORT = 5000;

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.error(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
    );
  });
} else {
  const app = express();
  //Middleware for JSON
  //   app.use(bodyParser.json());
  app.use(express.json());
  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, "../build")));

  // Answer API requests.

  app.put("/api/notes/:id", (request, response) => {
    const { title, content } = request.body;
    const note = {
      title: title,
      content: content,
    };
    console.log(request.body);

    Note.findByIdAndUpdate(request.params.id, note, { new: true })
      .then((updatedNote) => {
        response.json(updatedNote);
      })
      .catch((err) => {
        console.error(err);
        response.status(400).send({ error: "malformatted id" });
      });
  });
  app.delete("/api/notes/:id", (request, response) => {
    Note.findByIdAndRemove(request.params.id)
      .then((result) => {
        response.status(204).end();
      })
      .catch((err) => {
        //simple error handling for now
        console.error(err);
        response.status(404).end();
      });
  });

  app.post("/api/notes", (request, response) => {
    const note = request.body;

    new Note({
      title: note.title,
      content: note.content,
      date: new Date(),
    })
      .save()
      .then((savedNote) => {
        response.json(savedNote);
      });
  });

  app.get("/api/notes/:id", (request, response) => {
    Note.findById(request.params.id)
      .then((note) => {
        if (note) {
          response.json(note);
        } else {
          response.status(404).end();
        }
      })
      .catch((err) => {
        console.error(err);
        response.status(400).send({ error: "malformatted id" });
      });
  });

  app.get("/api/notes", function (request, response) {
    /* res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
    */
    Note.find({}).then((notes) => {
      response.json(notes);
    });
  });

  // app.use((req, res, next) => {
  //   // nonce should be base64 encoded
  //   res.locals.styleNonce = crypto.randomBytes(32).toString("hex");
  //   next();
  // });

  // app.use(
  //   helmet.contentSecurityPolicy({
  //     directives: {
  //       defaultSrc: ["'self'"],
  //       objectSrc: ["'none'"],
  //       baseUri: ["'none'"],
  //       styleSrc: ["'self'", (req, res) => `'nonce-${res.locals.styleNonce}'`],
  //       scriptSrc: ["'strict-dynamic'", "'report-sample'", "https:", "http:"],
  //     },
  //   })
  // );
  // All remaining requests return the React app, so it can handle routing.
  app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "../build", "index.html"));
    // response.render(path.resolve(__dirname, "../build", "index.html"), {
    //   styleNonce: res.locals.styleNonce,
    // });
  });

  app.listen(PORT, function () {
    console.log(
      `Node ${
        isDev ? "dev server" : "cluster worker " + process.pid
      }: listening on port ${PORT}`
    );
  });
}
