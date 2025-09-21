import redisclient from "../redisconfig/redis.js";

const windowsize = 3600; //1 hour
const maxerequests = 60; //60 requests per hour
const ratelimiter = async (req, res, next) => {
  try {
      const key = req.ip;
      const currentime = Date.now()/1000;
      const windowtime =  currentime - windowsize;

      await redisclient.zRemRangeByScore(key , 0 , windowtime);

      const numberofrequest = await redisclient.zCard(key);

      if(numberofrequest >= maxerequests){
        return res.status(429).json({ message: "Too many requests. Try again later." });
      }

      await redisclient.zAdd(key , {score:currentime , value : `${currentime}:${Math.random()}`});
      await redisclient.expire(key , windowsize);

    // const ip = req.ip; 

    // //here ip will act as key and incr will be done automatically if key is not present it will create one and set value to 1
    // const count = await redisclient.incr(ip);

    // if (count === 1) {
    //   await redisclient.expire(ip, 3600);
    // }

    // if (count > 60) {
    //   return res.status(429).json({ message: "Too many requests. Try again later." });
    // }

    next(); 
  } catch (error) {
    console.error("Rate limiter error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default ratelimiter;
