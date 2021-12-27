const express = require("express");
const router = express.Router();
const CropRoute=require("./crops.route")
const authRoute=require("./auth.route")

// router.get("/", (req, res)=>{
//     res.send("Faisal");
// })
router.use("/crops", CropRoute);
router.use("/auth", authRoute);



module.exports = router;