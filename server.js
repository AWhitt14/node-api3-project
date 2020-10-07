const express = require('express');
const logger = require('./middleware/logger')
const userRouter = require('./users/userRouter')

const server = express();
const port = 3000;

server.use(express.json())
server.use(logger)
server.use('/users',userRouter)


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({message: 'server error'})
})

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
