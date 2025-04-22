const express = require('express');
       const router = express.Router();
       router.get('/', (req, res) => res.send('Mocked route'));
       module.exports = router;