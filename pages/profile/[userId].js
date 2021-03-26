import {useEffect, useState} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
	isAuthenticated, 
	connectStripe, 
	getUser, 
	editUser,
	accountBalance
} from '../../components/helpers';
import Redirect from '../../components/Redirect';
import redirect from 'nextjs-redirect'
import axios from 'axios';
import {useRouter} from 'next/router';

const url = 'http://localhost:8000';

const Profile = (props) => {
	const router = useRouter();

	const [loaded, setLoaded] = useState(false);
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [stripeUrl, setStripeUrl] = useState('');
	const [balance, setBalance] = useState(Number);

	useEffect(() => {
		// setUserId(props.userId);
		console.log(props.user);
		!isAuthenticated() && router.push('/login');
		setEmail(props.user.email);
		setUsername(props.user.username);
		setPassword(props.user.password);
		if(isAuthenticated()){
			const {token} = isAuthenticated();
			accountBalance(props.userId, token).then(res => {
				console.log(res.data);
				setBalance(res.data.pending[0].amount / 100);
			})
		}
	}, []);

	const handleClick = () => {
		const {token} = isAuthenticated();
		const {_id} = isAuthenticated().user;
		connectStripe(_id, token).then(res => {
			console.log(res.data);
			setStripeUrl(res.data.url);
			setLoaded(true);
		})
	}

	const handleChange = e => {
		if(e.target.name === 'email'){
			setEmail(e.target.value);
		}
		if(e.target.name === 'username'){
			setUsername(e.target.value);
		}
		if(e.target.name === 'password'){
			setPassword(e.target.value);
		}
	}

	const handleSubmit = e => {
		e.preventDefault();
		const {token} = isAuthenticated();
		editUser(token, props.userId, email, username, password).then(res => {
			console.log(res.data);
		});
	}

	if(loaded){
		router.push(stripeUrl);
	}

	const sideMenu = () => {
		return(
			<div class="list-group">
			  <Link href={`/orders/${props.userId}`} ><a class="list-group-item list-group-item-action">Orders</a></Link>
			  <Link href={`/products/user/${props.userId}`} ><a class="list-group-item list-group-item-action">Products</a></Link>
			</div>
		)
	}

	return (
		<div className='container-fluid'>
			<Head>
		        <title>{props.username}'s Profile</title>
		        <meta property="og:title" content={`$'s Profile`} key="title" />
	      	</Head>
	      	<h1>{props.username}'s Profile</h1>
	      	<div className='row'>
	      	<div className='col-md-4'>
	      		{sideMenu()}
	      	</div>
	      	<div className='col-md-8' style={{float: 'right'}}>
	      		<div className='row'>
	      			{props.user.stripeAccount ? (
	      				<button className='btn btn-secondary' disabled>Connected to Stripe</button>
      				):(
      					<button onClick={handleClick} className='btn ml-auto btn-primary'>Connect to Stripe</button>
      				)}
		      		
		      		<div className='col'>
			      		<div className='ml-3 mr-4'>
				      		Balance is ${`${balance}`}
				      	</div>

			      	</div>
			      	
		      	</div>
		      	<div>
			      		<h3>Edit Profile</h3>
			      		<form onSubmit={handleSubmit}>
			      		    <div className='form-group'>
			      				<label htmlFor="">Email</label>
			      				<input 
			      				className='form-control' 
			      				type="email"
			      				name='email'
			      				onChange={handleChange}
			      				value={email}
			      				/>
			      			</div>
			      			<div className='form-group'>
			      				<label htmlFor="">Username</label>
			      				<input 
			      				className='form-control' 
			      				type="text"
			      				name='username'
			      				onChange={handleChange}
			      				value={username}
			      				/>
			      			</div>
			      			<div className='form-group'>
			      				<label htmlFor="">Change Password</label>
			      				<input 
			      				className='form-control' 
			      				type="password"
			      				name='password'
			      				onChange={handleChange}
			      				value={password}
			      				/>
			      			</div>
			      			<button className='btn btn-warning'>Update</button>
			      		</form>
			      	</div>
	      	</div>
	      	
	      	</div>
		</div>
	)
}

export const getServerSideProps = async (ctx) => {
  const {userId} = await ctx.query;
  const token = await ctx.req.headers.cookie.split('=')[1];
  const res = await getUser(userId, token);
  return { props: {username: res.data.username, userId: res.data._id, user: res.data }};
}


export default Profile;