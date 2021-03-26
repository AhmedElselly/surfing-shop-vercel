const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  // server.get('/profile/:userId', (req, res) => {
  //   app.render(req, res, '/profile', {userId: req.params.userId});
  // });

  // server.get('/orders/:userId', (req, res) => {
  //   app.render(req, res, '/orders', {userId: req.params.userId});
  // });

  server.get('/update-product/:productId', (req, res) => {
    app.render(req, res, '/update-product', {productId: req.params.productId});
  });

  server.get('/products/user/:userId', (req, res) => {
    app.render(req, res, '/products/user', {userId: req.params.userId});
  });

  // server.get('/product/:productId', (req, res) => {
  //   app.render(req, res, '/product', {productId: req.params.productId});
  // });

  
  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
