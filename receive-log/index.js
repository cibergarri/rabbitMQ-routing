const {
  connect,
  consume,
  createChannel,
  assertExchange,
  assertQueue,
  bindQueue,  
} = require('../amqp');

const args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: npm run receiver [info] [warning] [error]");
  process.exit(1);
}

const onMessage = (msg) => {
  if(msg.content) {
    console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
  }
};

const bindToKey = (channel, queue) => (key) => bindQueue(channel, queue, key);

const init = async () => {
  const connection = await connect();
  const channel = await createChannel(connection);
  await assertExchange(channel, 'direct');
  const queueObj = await assertQueue(channel);
  const { queue } = queueObj;
  await Promise.all(args.map(bindToKey(channel, queue)));
  await consume(channel, queue, onMessage);
  return { channel, connection, queue };
}

init().catch(console.warn);