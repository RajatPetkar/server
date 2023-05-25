const jwt = require('jsonwebtoken');
const user = require('../model/schema');

const auth =async(req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        const verify = jwt.verify(token,process.env.SECRET_KEY);

        const rootUser = await user.findOne({_id:verify._id , "tokens.token":token});
        if(!rootUser){throw new Error('user not found')}
        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;

        next();

    } catch (error) {
        res.status(401).send('unauthorized')
        console.log(error);
    }
}

module.exports = auth;