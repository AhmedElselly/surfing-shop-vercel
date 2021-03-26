export const addToCart = (item, cb) => {
	let cart = [];
	console.log('item', item)
	if(localStorage.getItem('cart')){			
		cart = JSON.parse(localStorage.getItem('cart'));
	} 
	cart.push({
		product: item,
		quantity: 1,
		author: item.author._id
	});	
	localStorage.setItem('cart', JSON.stringify(cart));		
	
	cb();
}

export const getCartItems = () => {
	if(localStorage.getItem('cart')){
		return JSON.parse(localStorage.getItem('cart'));
	}
	return [];
}

export const updateCart = (index, quantity) => {
	let cart = [];
	if(process.browser){
		if(localStorage.getItem('cart')){
			cart = JSON.parse(localStorage.getItem('cart'));
		}
		cart[index].quantity = quantity;
		localStorage.setItem('cart', JSON.stringify(cart));
	}
}

export const removeItem = index => {
	let cart = [];
	if(process.browser){
		if(localStorage.getItem('cart')){
			cart = JSON.parse(localStorage.getItem('cart'));
		}
		cart.splice(index, 1)
		localStorage.setItem('cart', JSON.stringify(cart));
	}
	return cart;
}

export const cartLength = () => {
	if(localStorage.getItem('cart')){
		return JSON.parse(localStorage.getItem('cart')).length;
	}
	return null;
}