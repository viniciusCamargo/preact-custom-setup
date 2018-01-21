
const net = require('net')

let portRange = 3000

const getPort = (cb) => {
  const port = portRange
  portRange += 1

  const server = net.createServer()

  server.listen(port, (err) => {
    server.once('close', () => cb(port))

    server.close()
  })

  server.on('error', (err) => getPort(cb))
}

module.exports = { getPort }