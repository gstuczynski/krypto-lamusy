const express = require('express')
const app = express()
const port = 3000

app.get('/dupa', (req, res) => {
    res.status(200).send({dupa: 'DUPA'})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})