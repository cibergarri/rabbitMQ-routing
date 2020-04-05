const {
  connect,
  createChannel,
  assertExchange,
  publishMessage,
} = require('../amqp');

const args = process.argv.slice(2);
const severityKey = (args.length > 0) ? args[0] : 'info';
const msg = args.slice(1).join(' ') || 'Hello World!';

const emit = async () => {
  const connection = await connect();
  const channel = await createChannel(connection);
  await assertExchange(channel, 'direct');
  await publishMessage(channel, severityKey, msg);
  console.log(" [x] Sent %s: '%s'", severityKey, msg);
  setTimeout(() => { 
    connection.close(); 
    process.exit(0); 
  }, 500);
};

emit();