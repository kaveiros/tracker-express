const zmq = require('zeromq')
const subscriber = zmq.socket('sub')
subscriber.connect("tcp://localhost:8688")
subscriber.subscribe("")
//publisher.send('FUBAR')
subscriber.on("message", function(reply) {
    console.log('Received message: ', reply.toString());
})