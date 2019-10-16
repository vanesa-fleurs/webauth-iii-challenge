const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    //header from web token
    const token = req.headers.authorization;

    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if(err){
                res.status(401).json({ message: 'No valid credentials!' });
            }
            else{
                req.user = {
                    username: decodedToken.username,
                    department: decodedToken.department,
                  };
                next();
            }
        });
    }
    else{
        res.status(400).json({ message: 'No token provided' });
    }
}