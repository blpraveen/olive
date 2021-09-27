import logo from "../images/logo.png";

export default async function displayRazorpay(data) {

  const options = {
    key: process.env.RAZORPAY_KEY_ID,
    currency: 'INR',
    amount: data.amount.toFixed(2).replace(/\./g,''),
    name: "Olive Book",
    description: "Buy Book Online",
    image: logo,
    order_id: data.id,
    handler: function (response) {
      data.callback(response);
    },
    prefill: {
      name: data.name,
      email: data.email,
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}