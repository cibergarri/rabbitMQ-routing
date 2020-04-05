
Routing messages to different queues based on a key.

Example: Logger with different severities handled in one or another queues

start rabbitMQ in docker:
```
 docker run -d --name amqp.test -p 5672:5672 rabbitmq
```

Start one log receiver storing just ERROR logs in file:
```
npm run receiver error > logs_from_rabbit.log
```

Start another log receiver showing logs in bash for more severity keys:
```
npm run receiver info warning error
```

Send logs
```
npm run emitter error Logging an error in both queues

npm run emitter warning Logging a warning error just in bash
```