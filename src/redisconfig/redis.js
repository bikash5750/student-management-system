import redis from 'redis';
import {REDIS_PASSWORD} from '../../config.js';

const redisclient = redis.createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'redis-12386.crce179.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 12386
    }
});


export default redisclient;