const express = require('express');
const {
    check
} = require('express-validator');

const Song = require('../controllers/song');
const validate = require('../middlewares/validate');

const router = express.Router();


router.get('/', Song.findAll);
router.get('/:id', Song.findOne);
router.post('/', [
    check('title').not().isEmpty().withMessage('Song title is required'),
    check('data').not().isEmpty().withMessage('Song data is required')
], validate, Song.create);
router.patch('/:id', Song.update);
router.delete('/:id', Song.destroy);

module.exports = router;
