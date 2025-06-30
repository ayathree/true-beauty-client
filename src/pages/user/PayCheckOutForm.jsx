import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {  useEffect, useState } from "react";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";



const PayCheckOutForm = ({total, ids, owners}) => {
    const[error,setError]=useState('')
    const[clientSecret, setClientSecret]=useState('')
    const[transactionId, setTransactionId]=useState('')
     const stripe = useStripe();
  const elements = useElements();
  console.log(owners);
  const {user}=useAuth()
  const totalPrice = total
  

   useEffect(()=>{
      if(totalPrice>0){
        axios.post(`${import.meta.env.VITE_API_URL}/create-payment-intent`, { price: totalPrice})
      .then(res=>{
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret)
      })
      }
           
       },[axios,totalPrice])

    const handleSubmit=async(event)=>{
        event.preventDefault();
        if (!stripe || !elements) {
      return;
    }
     const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setError(error?.message)
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setError('')
    }
    // confirm payment
    const {paymentIntent,error:confirmError}=await stripe.confirmCardPayment(clientSecret,{
      payment_method:{
        card:card,
        billing_details:{
          email:user?.email || 'anonymous',
          name:user?.displayName || 'anonymous'
        }
      }
    })
    if(confirmError){
      console.log('confirm error');
    }
    else{
      console.log('payment intent',paymentIntent);
      if(paymentIntent.status === 'succeeded'){
        console.log('transaction id',paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // save the payment in database
        const payment={
          email: user.email,
          transactionId: paymentIntent.id,
          price: totalPrice,
          date: new Date(),
          productId: ids,
          admin : owners
        }
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/payments`, payment)
        console.log(res);
        if(res.data?.insertedId){
          toast.success('Paid Successfully')
        }
        else{
          toast.error('Something Wrong')
        }
      }
    }

    }
    return (
        
          <form onSubmit={handleSubmit} className="md:w-full md:max-w-md md:mx-auto max-w-lg w-[250px] ">
  {/* Card Element Container */}
  <div className="md:p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-600 mb-4">
    <CardElement
      options={{
        style: {
          base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': {
              color: '#aab7c4',
            },
            ':hover': {
              color: '#424770',
            },
          },
          invalid: {
            color: '#9e2146',
          },
        },
      }}
      className="md:w-full p-2 "
    />
  </div>

  {/* Payment Button */}
  <button 
    className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-200
      ${(!stripe || !clientSecret || transactionId) 
        ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
        : 'bg-rose-500 hover:bg-rose-600 text-white'}
      focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-opacity-50`}
    type="submit" 
    disabled={!stripe || !clientSecret || transactionId}
  >
    {transactionId ? 'Payment Successful' : 'Pay Now'}
  </button>

  {/* Status Messages */}
  <div className="mt-4 space-y-2">
    {error && (
      <p className="text-red-500 text-sm md:text-base px-2 py-1 bg-red-50 rounded">
        {error}
      </p>
    )}
    {transactionId && (
      <div className="text-green-600 text-sm md:text-base px-2 py-1 bg-green-50 rounded">
        <p>Your Transaction ID:</p>
        <p className="font-mono break-all">{transactionId}</p>
        <p className="mt-1 text-green-700">Payment processed successfully!</p>
      </div>
    )}
  </div>
</form>
       
    );
};

export default PayCheckOutForm;