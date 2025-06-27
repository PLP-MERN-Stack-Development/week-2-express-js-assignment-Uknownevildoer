//authentication middleware
module.exports= (req, res, next) => {
  const userKey = req.headers['authorization']; 
  if (userKey !== process.env.API_KEY) {
    return res.status(401).json({ success: false, msg: 'Unauthorized: Missing or invalid API key' });
  }
  next(); 
};
