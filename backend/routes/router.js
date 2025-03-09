const router = require("express").Router()

//Services router
const serviceController = require("./service")

router.use("/", serviceController)

module.exports = router;