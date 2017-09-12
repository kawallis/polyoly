const Router = require('express').Router;
const router = Router();
const Project = require('../models/project');
const Member = require('../models/member');

router
    .get('/', (req, res, next) => {
        Project.find()
            .select('-__v')
            .then(projects => res.send(projects))
            .catch(next);
    })

    .get('/all', (req, res, next) => {
        Project.find()
            .populate({ path: 'members', select: 'name' })
            .then(projects => res.send(projects))
            .catch(next);
    })

    .post('/', (req, res, next) => {
        new Project(req.body)
            .save()
            .then(project => res.send(project))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        const id = req.params.id;
        Promise.all([
            Project.findById(id),
            Member.find({ projectId: id })
        ])
            .then(results => {
                const project = results[0];
                const members = results[1];
                project.members = members;
                res.send(project);
            })
            .catch(next);
    })
    
    .delete('/:id', (req, res, next) => {
        Project.findByIdAndRemove(req.params.id)
            .then(response => {
                res.send({ removed: response ? true : false });
            })
            .catch(next);

    });

module.exports = router;