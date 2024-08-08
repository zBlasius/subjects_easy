#!/usr/bin/env node
"use strict";
var amqp = require('amqplib');
const ampUrl = 'amqps://b-856bd3dc-4fea-449b-ae05-7f6f3d54bda4.mq.us-east-1.amazonaws.com:5671/'; // o que colocar aqui em produção e homologação?
// como vamos subir isso para produção? 
// como subir a imagem docker em produção?
async function send() {
    try {
        const dataHomolog = {
            hostname:"b-856bd3dc-4fea-449b-ae05-7f6f3d54bda4.mq.us-east-1.amazonaws.com",
            username: "admin",
            password: "XekSlH1JfNXJWKQfsmmASFnY",
            protocol: "amqps",
            port: "5671"
          }

        const dataLocal = {
            hostname:"localhost",
            username: "guest",
            password: "guest",
            protocol: "amqp",
            port: "5672"
        }
        const connection = await amqp.connect(dataLocal);
        const channel = await connection.createChannel();

        for (let index = 0; index < 1; index++) {
            
            const exchange = 'SLACK_PAID_LISTENER';
            
            // await channel.assertExchange(exchange, 'fanout', {durable:true})
            const message = "Exemplo de mensagem  0" + index;
            const data = {
                consortiumId: 17324,
                personId: 1223
            }
            
            channel.publish(exchange, "", Buffer.from(JSON.stringify(data)));
            
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