const express = require('express')
const router = express.Router()
const baike = require('../controllers/baike')

router.all('/GetHotDiseasesV2',  baike.getHotDiseasesV2)
router.all('/GetActiveData',  baike.getActiveData)
router.all('/GetTumourDiseases',  baike.GetTumourDiseases)

module.exports = router
