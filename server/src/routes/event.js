const express = require('express');
const {
    check
} = require('express-validator');

const Event = require('../controllers/event');
const validate = require('../middlewares/validate');

const router = express.Router();

//INDEX
router.get('/', Event.index);

//STORE
router.post('/', [
    check('category').not().isEmpty().withMessage('Category is required'),
    check('name').not().isEmpty().withMessage('Event name is required'),
    check('location').not().isEmpty().withMessage('Event location is required'),
    check('start_date').not().isEmpty().withMessage('Event start date and time is required'),
    check('description').not().isEmpty().withMessage('Event description is required')
], validate, Event.store);

//SHOW
router.get('/:id', Event.show);

//UPDATE
router.put('/:id', Event.update);

//DELETE
router.delete('/:id', Event.destroy);

module.exports = router;
