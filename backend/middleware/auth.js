const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
const{token}=req.headers

if(!token){
return res.status(401).json({message:'Token is not provided'});
}
try{
    const token_decode = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.body.userId = token_decode.id;
    
    next();
}catch(error){
    return res.status(401).json({success:false, message:'Invalid token'});
}
}
module.exports = authMiddleware;