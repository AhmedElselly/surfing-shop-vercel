import {useState, useEffect} from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import Layout from '../components/Layout';
import {login, authenticate, isAuthenticated} from '../components/helpers';

const Login = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		isAuthenticated() && router.push('/');
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		login(email, password).then(res => {
			console.log(res.data);
			authenticate(res.data, () => {
				console.log('logged in');
			})
			setLoading(true);
		})
	}

	const handleChange = e => {
		if(e.target.name === 'email'){
			setEmail(e.target.value);
		} else {
			setPassword(e.target.value);
		}
	}

	if(loading){
		router.push('/products');
	}

	return(
		<div>
			<Layout className='container' header='Login'>
				<form onSubmit={handleSubmit}>
				  <div className="form-group">
				    <label htmlFor="exampleInputEmail1">Email address</label>
				    <input type="email" name='email' value={email} onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="exampleInputPassword1">Password</label>
				    <input type="password" name='password' value={password} onChange={handleChange} className="form-control" id="exampleInputPassword1"/>
				  </div>
				  
				  <button type="submit" className="btn btn-primary">{loading ? 'loading' : 'Login'}</button>
				</form>
				<Link href='/reset-password'>
					<a>Forgot your password?</a>
				</Link>
			</Layout>	
		</div>
	)
}

export default Login;