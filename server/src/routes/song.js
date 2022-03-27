const express = require('express');
const {
    check
} = require('express-validator');
const multer = require('multer');

const Song = require('../controllers/song');
const validate = require('../middlewares/validate');

const router = express.Router();

const upload = multer({
    dest: 'uploads/'
}).single("file");


router.get('/', Song.findAll);
router.get('/:id', Song.findOne);
router.post('/', [
    check('title').not().isEmpty().withMessage('Song title is required')
], validate, Song.create);
router.patch('/:id', Song.update);
router.delete('/:id', Song.destroy);
router.post('/import', upload, Song.import);

module.exports = router;
