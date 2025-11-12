// middleware/auth.js
module.exports = function (req, res, next) {
  // Placeholder: Accept an API key in header for admin actions
  const apiKey = req.header('x-api-key');
  if(process.env.ADMIN_API_KEY && apiKey === process.env.ADMIN_API_KEY) return next();
  return res.status(401).json({ error: 'unauthorized' });
};
