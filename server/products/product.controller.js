const express = require('express');
const router = express.Router();
const productService = require('./product.service');
const multer = require('multer');
const upload = multer({ dest: 'static/' })
// routes
router.post('/create', upload.single('img'), createProduct);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;


function createProduct(req, res, next) {
    
    productService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    productService.getAll()
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    productService.getById(req.product.sub)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    productService.getById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
   productService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    productService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}