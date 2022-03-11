const express = require('express');
const {
    check
} = require('express-validator');

const Song = require('../controllers/song');
const validate = require('../middlewares/validate');

const router = express.Router();


//INDEX
router.get('/', Song.index);

//STORE
router.post('/', [
    check('title').not().isEmpty().withMessage('Song title is required'),
    check('data').not().isEmpty().withMessage('Song data is required')
], validate, Song.store);

//SHOW
router.get('/:id', Song.show);

//UPDATE
router.put('/:id', Song.update);

//DELETE
router.delete('/:id', Song.destroy);

module.exports = router;
