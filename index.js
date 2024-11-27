const express = require('express')
const app = express()

app.get('/', (req, res) => {
  const divisao = 10/2;
  const soma = 2 + 2;
  res.send({"divisao": divisao,
    "soma": soma
  })
})

app.listen(3000)