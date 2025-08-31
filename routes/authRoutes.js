const express = require('express');
const { protect } = require('../middlewares/auth');
const { register, login, getUser } = require('../controllers/authController');
const upload = require('../middlewares/upload');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/getUser', protect, getUser);

// upload.single('form_field_name')
router.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: 'No file uploaded',
    });
  }
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${
    req.file.filename
  }`;
  res.status(200).json({ imageUrl });
});

module.exports = router;
