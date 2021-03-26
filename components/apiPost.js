import axios from 'axios';
import queryString from 'query-string';
import {isAuthenticated} from './helpers';

const url = 'https://surfing-market.herokuapp.com';

export const create = async (formData, userId, token) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
	const res = await axios.post(`${url}/products/new/${userId}`, formData);
	return res;
}

export const update = async (userId, token, productId, formData) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
	const res = await axios.put(`${url}/products/update/${productId}/${userId}`, formData);
	return res;
}

export const remove = async (userId, token, productId) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
	const res = await axios.delete(`${url}/products/delete/${productId}/${userId}`);
	return res;
}

export const products = async (page) => {
	const res = await axios.get(`${url}/products`, {
		params: {
			page
		},
		paramsSerializer: params => {
			console.log(queryString.stringify(params));
			return queryString.stringify(params, {arrayFormat: 'repeat'});
		}
	});
	return res;
}

export const getProduct = async (productId) => {
	// axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};

	const res = await axios.get(`${url}/products/${productId}`);
	return res;
}

export const getProductsByUser = async (userId, token) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
	const res = await axios.get(`${url}/products/by-user/${userId}`);
	return res;
}

export const getProductsByCategory = async (category) => {
	console.log(category)
	const res = await axios.post(`${url}/products/products-by-category`, {category});
	return res;
}

export const createReview = async (productId, userId, text, rating, token) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
	const res = await axios.post(`${url}/products/review/${productId}/${userId}`, {
		text,
		rating
	});
	return res;
}

export const createOrder = async (token, userId, checkoutDetails, source, stripeAccount) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
	console.log('checkoutDetails', checkoutDetails)
	const res = await axios.post(`${url}/orders/new/${userId}`, {
		checkoutDetails,
		source,
		stripeAccount
	});
	return res;
}

export const ordersList = async (userId, token) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};

	const res = await axios.get(`${url}/orders/list/${userId}`);
	return res;
}

export const getStatuses = async (token) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
	const res = await axios.get(`${url}/orders/status-values`);
	return res;
}

export const updateOrderStatus = async (token, userId, orderId, cartItemId, status, amount) => {
	console.log('orderId', orderId)
	console.log('cartItemId', cartItemId)
	console.log('status', status)
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
	const res = await axios.put(`${url}/orders/update/status/${orderId}/${userId}`, {
		cartItemId,
		status,
		amount
	});
	return res;
}

export const searching = async (search, category) => {
	const res = await axios.get(`${url}/products/search`, {
		params:{
			search,
			category
		},
		paramsSerializer: params => {
			console.log(queryString.stringify(params));
			return queryString.stringify(params, {arrayFormat: 'repeat'});
		}
	});

	return res;
}

export const getCategories = async () => {
	const res = await axios.get(`${url}/products/categories`);
	return res;
}

export const productsForHome = async () => {
	const res = await axios.get(`${url}/products/products-for-home`);
	return res;
}