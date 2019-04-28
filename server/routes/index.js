const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        let results = await db.all();
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        let results = await db.one(req.params.id);
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/', async (req, res, next) => {     
    try {
        const thing = {
            title: req.body.title,
            desc: req.body.desc
        }
        let results = await db.insert(thing);
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/:id', async (req, res, next) => {   
    const id = req.params.id;  
    try {
        console.log(`router.post ${id}`);
        const thing = {
            title: req.body.title,
            desc: req.body.desc
        }
        let results = await db.update(id, thing);
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.delete('/:id', async(req, res, next) => {
    const id = req.params.id;  
    try {
        console.log(`router.delete ${id}`);
        let results = await db.delete(id);
        res.json(results);
    } catch(e) {
        console.log(e);
        res.status(500).send(`Error while deleting thing with id ${id}`);
    }
});

module.exports = router;