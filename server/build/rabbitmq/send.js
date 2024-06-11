#!/usr/bin/env node
"use strict";
var amqp = require('amqplib');
const ampUrl = 'amqp://localhost:5672/'; // o que colocar aqui em produção e homologação?
// como vamos subir isso para produção? 
// como subir a imagem docker em produção?
async function send() {
    try {

        const connection = await amqp.connect(ampUrl);
        const channel = await connection.createChannel();

        for (let index = 0; index <= 10; index++) {
            
            const exchange = 'direct_exchange';
            const routingKey = 'create_cnab';
            
            await channel.assertExchange(exchange, 'direct', {durable:true})
            const message = "Mensagem de exemplo para criar CNAB " + index;
            
            channel.publish(exchange, routingKey, Buffer.from(message));
            
            console.log(" [x] Sent %s ",message);
        }

        // setTimeout(()=>{
        //     connection.close();
        //     process.exit(0);
        // },500);

    } catch (error) {
        throw error;
    }
}

send().catch(console.error);
