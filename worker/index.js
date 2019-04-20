const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});

// sub, -> pub/sub
const sub = redisClient.duplicate();

function fib(index) {
    // sub-optimal performing fibonacci func intentional
    if (index < 2) return 1;
    return fib(index -1) + fib(index - 2);
}

// message is index value from the form
sub.on('message', (channel, message) => {
    redisClient.hset('values', message, fib(parseInt(message)));
});
// sub to insert events in redis
sub.subscribe('insert');