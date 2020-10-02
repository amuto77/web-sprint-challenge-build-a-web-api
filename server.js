const express = require('express')
const morgan = require('morgan')
const { tokens } = require('morgan')

const projectRouter = require('./data/projects/projectRouter')
const actionRouter = require('./data/actions/actionRouter')

const server = express()

const helmet = require('helmet');

server.use(morgan('Andrew'))
server.use(methodLogger)

morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        token.status(req, res),
        tokens.res(req, res, "content-length"), '_',
        tokens['response-time'](req, res), 'ms'
    ].join('')
})

function methodLogger(req, res, next) {
    console.log(`${req.method} request`)
    next()
}
server.use(express.json());
server.use(helmet());
server.get("/", (req, res) => {
    res.status(200).json({ message: "Server is online" });
});

server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);