import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {  useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";



const PayCheckOutForm = ({total, ids, owners}) => {
    const[error,setError]=useState('')
    const[clientSecret, setClientSecret]=useState('')
    const[transactionId, setTransactionId]=useState('')
     const stripe = useStripe();
  const elements = useElements();
  console.log(owners);
  const {user}=useAuth()
  const axiosSecure = useAxiosSecure()
  const totalPrice = total
  //  const [order, setOrder]=useState([])
  

   useEffect(()=>{
      if(totalPrice>0){
        axiosSecure.post('/create-payment-intent', { price: totalPrice})
      .then(res=>{
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret)
      })
      }
           
       },[axiosSecure,totalPrice])

    const handleSubmit=async(event)=>{
        event.preventDefault();
        if (!stripe || !elements) {
      return;
    }
     const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
     // Use your card Element with other Stripe.js APIs
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
        const res = await axiosSecure.post('/payments', payment)
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
        <form onSubmit={handleSubmit}>
            <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className="btn bg-rose-400 text-white mt-3" type="submit" disabled={!stripe || !clientSecret || transactionId}>
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {
        transactionId && <p className="text-green-600">Your Transaction Id: {transactionId}</p>

      }

        </form>
    );
};

export default PayCheckOutForm;