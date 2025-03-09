const router = require("express").Router()

//Services router
const serviceController = require("./services")

router.use("/", serviceController)

module.exports = router;