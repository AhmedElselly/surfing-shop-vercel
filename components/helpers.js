import axios from 'axios';
import cookie from 'js-cookie';
const url = 'https://surfing-market.herokuapp.com';

export const login = async (email, password) => {
	const res = await axios.post(`${url}/login`, {email, password});
	return res;
}

export const register = async (email, username, password) => {
	const res = await axios.post(`${url}/register`, {
		email,
		username,
		password
	});
	return res;
}

export const getUser = async (userId, token) => {
  axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
  const res = await axios.get(`${url}/${userId}`);
  return res;
}

export const editUser = async (token, userId, email, username, password) => {
  axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
  const res = await axios.put(`${url}/update/${userId}`, {
  	email,
  	username,
  	password
  });
  return res;
}

export const connectStripe = async (userId, token) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};

	const res = await axios.post(`${url}/create-stripe-account/${userId}`);
	return res;
}

export const accountBalance = async (userId, token) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
	const res = await axios.get(`${url}/connected-account-balance/${userId}`);
	return res;
}

export const resetPassword = async (email) => {
	const res = await axios.put(`${url}/reset-password`, {email});
	return res;
}

export const reset = async (password, confirmPassword, token) => {
	const res = await axios.put(`${url}/reset`, {password, confirmPassword, token});
	return res;
}

export const setCookie = (key, value) => {
	if(process.browser){
		cookie.set(key, value, {
			expires: 1
		});
	}
}


export const removeCookie = (key) => {
	if(process.browser){
		cookie.remove(key, {
			expires: 1
		});
	}
}


export const getCookie = (key) => {
	if(process.browser){
		return cookie.get(key);
	}
}



export const authenticate = (token, next) => {
	setCookie('token', token.token);	
	localStorage.setItem('user', JSON.stringify(token));
	next();

}

export const isAuthenticated = () => {
	if(process.browser){
		const cookieChecked = getCookie('token');
		if(cookieChecked){
			if(localStorage.getItem('user')){
				return JSON.parse(localStorage.getItem('user'));
			} else {
				return false;
			}
		}
	}
}

export const logout = async (next) => {
	if(localStorage.getItem('user')){
		removeCookie('token');
		localStorage.removeItem('user');
	}

	const res = await axios.get(`${url}/logout`);
	next();
	return res;
}

