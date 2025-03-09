const router = require("express").Router()

const servicecontroller = require("../controllers/serviceController")

//Functions
router
    .route("/services")
    .post((req, res) => servicecontroller.create(req, res));

router
    .route("/services")
    .get((req, res) => servicecontroller.create(req, res));

module.exports = router;