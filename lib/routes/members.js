const Router = require('express').Router;
const router = Router();
const Member = require('../models/member');
const Task = require('../models/task');

router
    .get('/', (req, res, next) => {
        Member.find()
            .select('-__v')
            .then(member => res.send(member))
            .catch(next);
    })

    .post('/', (req, res, next) => {
        new Member(req.body)
            .save()
            .then(member => res.send(member))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        const id = req.params.id;
        Promise.all([
            Member.findById(id),
            Task.find({ memberId: id })
        ])
            .then(results => {
                const member = results[0];
                const tasks = results[1];
                member.tasks = tasks;
                res.send(member);
            })
            .catch(next);
    })

    .put('/:id', (req, res, next) => {
        Member.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(member => res.send(member))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Member.findByIdAndRemove(req.params.id)
            .then(response => {
                res.send({ removed: response ? true : false });
            })
            .catch(next);

    });

module.exports = router;