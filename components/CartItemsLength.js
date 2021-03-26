import {getCartItems} from './cartHelpers';
import {useEffect, useState} from 'react';


const CartItemsLength = (props) => {
	const [length, setLength] = useState(null);
	useEffect(() => {
		if(length){
			setLength(getCartItems().length);
		}
		setLength(0);
	},[])
	return (
		<div>
			{length}
		</div>
	)
}

export default CartItemsLength;