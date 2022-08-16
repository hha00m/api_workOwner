const express = require("express");
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const router = express.Router();
const isLogined = require('../middleware/auth');
const { currentUser, update, remove, list,
    postImageS3, readImageS3 } = require("../controllers/user");
//-------------CRUD------------------------
router.put('/account/update', isLogined, update);
router.delete('/account/delete', isLogined, remove);
//-------------list------------------------
router.get('/accounts/', isLogined, list);
router.get("/me", isLogined, currentUser);
//-------------imageS3------------------------
router.get('/images/:key', readImageS3);
router.post('/upload.do', isLogined, upload.single('file'), postImageS3);

module.exports = router;
