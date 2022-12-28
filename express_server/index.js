const keys = require('./keys');
// Express App set up
const express = require('express');
const cors = require('cors'); 

const app = express();
app.use(cors());
// bodyParser has been replaced by express.json() in express >= 4.16.0
// This lets us interpret API responses as json
app.use(express.json());

// Postgres Client Setup
const { Pool } = require('pg');
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
});

pgClient.on("connect", (client) => {
    client
      .query("CREATE TABLE IF NOT EXISTS values (number INT)")
      .catch((err) => console.error(err));
});

pgClient.on("error", () => console.log('Lost Postgres Connection'));

// Redis Client Setup
const redis = require('redis');

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});

const redisPublisher = redisClient.duplicate();

// Express Route Handlers
app.get('/', (req, res) => {
    res.send(`You said: ${req.body}`)
});

app.get('/values/all', async (req, res) => {
    const values = await pgClient.query('SELECT * FROM values');

    res.send(values.rows);
});

app.get('/values/current', async (req, res) => {
    const values = await redisClient.hgetall('values', (err, values) => {
        res.send(values);
    })
});

app.post('/values', async (req, res) => {
    const index = req.body.index;

    // cap max index
    if(parseInt(index) > 40){
        return res.status(422).send('Index too high')
    }

    // See the distinction between redisClient & redisPublisher here
    // One checks
    redisClient.hset('values', index, 'Nothing yet');
    redisPublisher.publish('insert', index);
    pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);

    res.send({
        working: true
    })
});

app.listen(5000, err => {
    console.log('Listening on 5000')
})
