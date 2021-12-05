const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});

const redisPublisher = redisClient.duplicate();

// Function to calculate the fibonacci number based on index
function fib(index){
    if (index < 2) return 1;
    return fib(index - 1) + fib(index - 2); // recursive solution to fibonacci sequence problem
}

redisPublisher.on('message', (channel, message) => {
    redisClient.hset('values', message, fib(parseInt(message)));
})

redisPublisher.subscribe('insert');
