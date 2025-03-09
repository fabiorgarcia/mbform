const router = require("express").Router()

const servicecontroller = require("../controllers/serviceController")

//Funções
router
    .route("/services")
    .get((req, res) => servicecontroller.create(req, res));

module.exports = router;