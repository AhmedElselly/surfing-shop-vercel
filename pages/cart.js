import {useEffect, useState} from 'react';
import CartItems from '../components/CartItems';
import dynamic from 'next/dynamic';

const Cart = (props) => {
	
	return(
		<div className='container-fluid'>
			<CartItems/>
		</div>
	)
}


export default Cart;