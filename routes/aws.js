const express = require('express')
const router = express.Router()

router.get('/api/aws',async(req,res) => {
    const data = {
        SecretKeyID : process.env.AAKID,
        SecretKey : process.env.AAKK
    }
    res.send(data)
})


module.exports = router;