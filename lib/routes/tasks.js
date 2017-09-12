const Router = require('express').Router;
const router = Router();
const Task = require('../models/task');

router
    .get('/', (req, res, next) => {
        Task.find()
            .select('-__v')
            .then(task => res.send(task))
            .catch(next);
    })

    .post('/', (req, res, next) => {
        new Task(req.body)
            .save()
            .then(task => res.send(task))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        const id = req.params.id;
        Task.findById(id)
            .then(task => {
                res.send(task);
            })
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Task.findByIdAndRemove(req.params.id)
            .then(response => {
                res.send({ removed: response ? true : false });
            })
            .catch(next);

    });

module.exports = router;