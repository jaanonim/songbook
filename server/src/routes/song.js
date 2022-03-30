const express = require('express');
const {
    check
} = require('express-validator');
const multer = require('multer');

const Song = require('../controllers/song');
const validate = require('../middlewares/validate');

const router = express.Router();

const upload = multer({
    dest: 'static/uploads/'
}).single("file");


router.get('/', Song.findAll);
router.get('/:id', Song.findOne);
router.post('/', [
    check('title').not().isEmpty().withMessage('Song title is required')
], validate, Song.create);
router.patch('/:id', Song.update);
router.delete('/:id', Song.destroy);
router.put('/import', upload, Song.import);
router.put('/export', Song.export);

module.exports = router;
