import {useEffect, useState} from 'react';
import {isAuthenticated} from './helpers';
import {getCartItems, updateCart, removeItem} from '../components/cartHelpers';
import Link from 'next/link';
import CheckoutForm from './CheckoutForm';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';



const CartItems = props => {
	const [items, setItems] = useState();
	// const [stripeAccount, setStripeAccount] = useState('');
	let stripeAccount;
	useEffect(() => {
		setItems(getCartItems())
		console.log(items);
		getTotalPrice()
	},[])
	const stripePromise = loadStripe('pk_test_fanZLznQoHp09rw1HXuS0vZA0019urp2MB', {
		stripeAccount: stripeAccount
	});
	
	const handleChange = index => e => {
		let updatedCartItems = items;
		if(e.target.value === 0){
			updatedCartItems[index].quantity = 1;
		} else {
			updatedCartItems[index].quantity = Number(e.target.value);
		}
		setItems([...updatedCartItems]);
		updateCart(index, Number(e.target.value));
	}

	const handleRemove = index => e => {
		let updatedCartItems = removeItem(index);
		setItems(updatedCartItems);
	}

	const getTotalPrice = () => {	
		if(items){
			return items.reduce((a, b) => {
				return a + (b.quantity * b.product.price);
			}, 0);	
		} else {
			return 0;
		}
	}

	const createStripeAccount = (index) => {
		console.log('stripeAccount', items[index].product.author.stripeAccount);

		stripeAccount = items[index].product.author.stripeAccount;
	}

	const generateCartItems = () => {
		const cart = items.map((item, i) => {
			createStripeAccount(i);
		return (
			<div key={item.product._id} className="card" style={{width: '18rem', height: '50%'}}>
			  <img style={{objectFit: 'contain'}} height='50%' src={`https://surfing-market.herokuapp.com/products/${item.product._id}/image`} className="card-img-top" alt="..."/>
			  <div className="card-body">
			    <Link href={`/product?productId=${item.product._id}`} as={`/product/${item.product._id}`}><a><h5 className="card-title">{item.product.name}</h5></a></Link>
			    <p className="card-text">${item.product.price}</p>
			    <p className="card-text">{item.product.body}</p>
			    
			   	<button className='btn btn-danger' onClick={handleRemove(i)}>Remove</button>
			    <input type="number" min='1' value={item.quantity} onChange={handleChange(i)} />
			  </div>
			</div>
		)})
		return cart;	
				
	}
	return (
		<div className='row'>
			<div style={{maxWidth: '100%'}} className='col-md-4'>
				{items ? (
					<div>
					<h1>You have {items.length} item on your cart</h1>
					{generateCartItems()}
					</div>	
				):(
					<h1>Your cart is empty</h1>
				)}
			</div>
			<div className='col-md-8'>
				{getTotalPrice() != 0 && (
				<h2>Total Price: {getTotalPrice()}</h2>
				)}
				<div>
					{isAuthenticated() ? (
						<Elements stripe={stripePromise}>
							{items && items.length !== 0 && (
								<CheckoutForm items={items} stripeAccount={stripeAccount}/>
							)}
						</Elements>
					):(
						<h4>Please Login to continue payment!.</h4>
					)}
					
				</div>
			</div>
		
		</div>
	)
}

export default CartItems;