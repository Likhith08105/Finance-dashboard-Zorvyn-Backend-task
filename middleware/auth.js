// mock authentication middleware using headers
const User = require('../models/User');

module.exports = async (req, res, next) => {
  // Example: pass user id in x-user-id header
  const userId = req.header('x-user-id');
  if (!userId) return res.status(401).json({ message: 'Missing x-user-id header' });
  const user = await User.findById(userId);
  if (!user || !user.isActive) return res.status(401).json({ message: 'Invalid or inactive user' });
  req.user = user;
  next();
};
