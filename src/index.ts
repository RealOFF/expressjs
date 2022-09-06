import bodyParser from "body-parser"
import express from "express"
// import { Stripe } from "stripe"

const app = express()
const port = process.env.PORT || 4242

app.use(bodyParser.json())
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }))
app.use(bodyParser.text({ type: "text/html" }))

app.get("/", async (req, res) => {
  res.json({ Hello: "World" })
})

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
// const stripe = Stripe.('pk_live_51Ledj2A0IpSFV68AclliruAKxNvlMNp5ispUSiKEPSoNpE0tV5iz9zwhtfifaOGzLqS1JvKqQxfUqaUSvtLO5ZVS0096zgqbnO')

// Match the raw body to content type application/json
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), (request, response) => {
  const event = request.body

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object
      console.log('PaymentIntent was successful!')
      break
    case 'payment_method.attached':
      const paymentMethod = event.data.object
      console.log('PaymentMethod was attached to a Customer!')
      break
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`)
  }
  console.log('event:', event)
  // Return a 200 response to acknowledge receipt of the event
  response.header('Access-Control-Allow-Origin', '*')
  response.json({ received: true })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
