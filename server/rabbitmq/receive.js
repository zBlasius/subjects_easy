const amqp = require('amqplib');

async function receive() {

    try {
        // Como vamos "escutar" isso em produção? Como vamos configurar para funcionar tanto em HML quanto em PROD?
        // Elaboramos um documento para funcionar em localhost também?

        const connection = await amqp.connect('amqp://localhost:5672/');
        // o que fazer com amqp://localhost:5672/ em HML e Produção ?
        const channel = await connection.createChannel();

        const queue = 'Teste';
        await channel.prefetch(1); // significa que enviamos 1 mensagem por vez, aguarando o consumidor dar um retorno de que a mensagem foi processada

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        
        channel.consume(queue, async (msg) => {
            console.log(" [x] Received %s", msg.content.toString());
            channel.ack(msg); // marca a mensagem como "Processada", ou seja, não será processada novamente
        }, {
            noAck: false
        });
    } catch (error) {
        throw error;
    }
}

receive().catch(console.error)