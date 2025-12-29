import aj from "../config/arcject.js";

const arcjectMiddleware = async(req ,res , next) => {
  try{
    const decision = await aj.protect(req, {requested:1});
    if(decision.isDenied()){

        if(decision.reason.isRateLimit())
            return res.status(429).json({ message: 'Too many requests - please try again later.' });
        if(decision.reason.isBot())
            return res.status(403).json({ message: 'Bot detected - access denied.' });
        return res.status(403).json({ message: 'Access Denied' });
    }
    next();
  }
  catch(error){
    console.log(`Arcject Middleware Error:${error} `)
  }
};

export default arcjectMiddleware;   