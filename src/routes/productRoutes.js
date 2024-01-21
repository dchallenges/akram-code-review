const express = require('express');
const router = express.Router();
const productService = require('../services/productService'); // REVIEW: You can use destructuring to make the code cleaner => const { findAll, find, save, delete, getInventory } = require('../services/productService');
// REVIEW: It is better to remove the redundant prefix from the routes here and use it in a higher level (server.js) instead.
router.get('/products', productService.findAll); // REVIEW: This becomes router.get('/', findAll);
router.get('/products/:id', productService.find); // REVIEW: This becomes router.get('/:id', find);
router.post('/products', productService.save); // REVIEW: This becomes router.post('/', save);
router.delete('/products/:id', productService.delete); // REVIEW: This becomes router.delete('/:id', delete);
router.get('/products/inventory', productService.getInventory); // REVIEW: This becomes router.get('/inventory', getInventory);
module.exports = router;