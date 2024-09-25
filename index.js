let express = require("express");
let cors = require("cors");


const app = express()
const PORT = 3000;
app.use(cors());

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

app.get('/cart-total',(req,res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalCartValue = cartTotal + newItemPrice;

  res.send(totalCartValue.toString())
})

app.get('/membership-discount',(req,res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  let discountPercentage = 10;
  let MembershipStatus;

  if( isMember === 'true'){
    MembershipStatus = cartTotal - (cartTotal * discountPercentage)
  }

  res.send(MembershipStatus.toString())
})

app.get('/calculate-tax',(req,res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let taxRate = 5;
  let cartAmount = cartTotal * taxRate;

  res.send(cartAmount.toString())
})

app.get('/estimate-delivery',(req,res) => {
  let shippingMethod = req.query.shippingMethod.toLowerCase();
  let distance = parseFloat(req.query.distance);
  let deliveryDays;

  if (shippingMethod === 'standard'){
    deliveryDays = distance/50;
  }else if (shippingMethod === 'express'){
    deliveryDays = distance/100;
  }else{
    deliveryDays = "No shipping method available"
  }
  res.send(deliveryDays.toString());

})

app.get('/shipping-cost',(req,res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost;
  
  if (weight >= 2){
    shippingCost = weight * distance * 0.1
  }
  res.send(shippingCost.toString());
})

app.get('/loyalty-points', (req,res) =>{
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyRate = 2;
  let loyaltyPoints = purchaseAmount * loyaltyRate;

  res.send(loyaltyPoints.toString())
})


app.listen(PORT, () => console.log("Server is listening on port " + PORT));