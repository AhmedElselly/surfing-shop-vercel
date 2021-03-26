import {useState, useEffect} from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {createOrder} from './apiPost';
import {isAuthenticated} from './helpers';
import {getCartItems} from './cartHelpers';

const styles = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};


const CheckoutForm = (props) => {
	const stripe = useStripe();
  const elements = useElements();
  const [values, setValues] = useState({
    checkoutDetails:{
      products: null,
      customerEmail: '',
      customerName: '',
      deliveryAddress: {
        street: '',
        city: '',
        state: '',
        country: '',
        zipcode: ''
      }
    }
  });

  useEffect(() => {
    let {checkoutDetails} = values;
    // let {products} = values.checkoutDetails;
    if(!values['products']){
      checkoutDetails['products'] = props.items;
    }
    setValues({...values, checkoutDetails: checkoutDetails})
  },[props.items]);

  const handleChange = name => e => {
    let {checkoutDetails} = values;
    if(name === 'customerEmail' || name === 'customerName'){
      console.log(name, e.target.value)
      checkoutDetails[name] = e.target.value;
    }
    
    console.log(name, e.target.value)
    checkoutDetails.deliveryAddress[name] = e.target.value;
    setValues({...values.checkoutDetails, checkoutDetails: checkoutDetails});
  }

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    
    stripe.createSource(cardElement).then(result => {
      const {_id} = isAuthenticated().user;
      const {token} = isAuthenticated();
      const stripeAccount = props.stripeAccount;
      createOrder(token, _id, values.checkoutDetails, result.source, stripeAccount)
        .then(res => {
          console.log(res.data);
        });
    });
  };
	return(
		<form onSubmit={handleSubmit}>
      <div>
      <h5>Card Details</h5>
      <CardElement style={styles} />
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputEmail4">Email</label>
          <input type="email" value={values.checkoutDetails.customerEmail} onChange={handleChange('customerEmail')} class="form-control" id="inputEmail4"/>
        </div>
        <div class="form-group col-md-6">
          <label for="inputPassword4">Name</label>
          <input type="text" value={values.checkoutDetails.customerName} onChange={handleChange('customerName')} class="form-control" id="inputPassword4"/>
        </div>
      </div>
      <div class="form-group">
        <label for="inputAddress">Street</label>
        <input type="text" value={values.checkoutDetails.deliveryAddress.street} onChange={handleChange('street')} class="form-control" id="inputAddress" placeholder="1234 Main St"/>
      </div>
      <div class="form-group">
        <label for="inputAddress2">City </label>
        <input type="text" value={values.checkoutDetails.deliveryAddress.city} onChange={handleChange('city')} class="form-control" id="inputAddress2" placeholder="City"/>
      </div>
      <div class="form-group">
        <label for="inputAddress2">State </label>
        <input type="text" value={values.checkoutDetails.deliveryAddress.state} onChange={handleChange('state')} class="form-control" id="inputAddress2" placeholder="State"/>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputCity">Country</label>
          <input type="text" value={values.checkoutDetails.deliveryAddress.country} onChange={handleChange('country')} class="form-control" id="inputCity" placeholder='Country'/>
        </div>
        
        <div class="form-group col-md-2">
          <label for="inputZip">Zipcode</label>
          <input type="text" value={values.checkoutDetails.deliveryAddress.zipcode} onChange={handleChange('zipcode')} class="form-control" id="inputZip" placeholder='Zipcode'/>
        </div>
      </div>
      
      <button className='btn btn-primary paymentButton' type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
	)
}

export default CheckoutForm;