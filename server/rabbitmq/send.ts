#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

const ampUrl = 'amqp://localhost' // o que colocar aqui em produção e homologação?

amqp.connect('amqp://localhost', function(error0:any, connection:any) { // o que
  if (error0) {
    throw error0;
  }
  
  connection.createChannel(function(error1:any, channel:any) {
    if (error1) {
        throw error1;
      }
      var queue = 'hello';
      var msg = 'Hello world';
  
      channel.assertQueue(queue, {
        durable: false
      });
  
      // Declaring a queue is idempotent - it will only be created if it doesn't exist already. The message content is a byte array, so you can encode whatever you like there.
      // ou seja, há uma regra de indepotência na criação de filas, ou seja, a task só será criada se ela ainda não existir. Então, precisamos encontrar um jeito de criar um identificador único

      channel.sendToQueue(queue, Buffer.from(msg));
      console.log(" [x] Sent %s", msg);
  });
  // Regra para finalizar a fila
//   setTimeout(function() {
//     connection.close();
//     process.exit(0)
//     }, 500);
});



