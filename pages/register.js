import {useState, useEffect} from 'react';
import {useRouter} from 'next/router'; 
import Layout from '../components/Layout';
import {isAuthenticated, register} from '../components/helpers';

const Register = () => {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	useEffect(() => {
		isAuthenticated() && router.push('/');
	}, []);

	const handleChange = e => {
		if(e.target.name === 'email'){
			setEmail(e.target.value);
		} else if(e.target.name === 'username'){
			setUsername(e.target.value);
		} else {
			setPassword(e.target.value);
		}
	}

	const handleSubmit = e => {
		e.preventDefault();
		register(email, username, password).then(res => {
			console.log(res.data);
			setLoading(true);
			
		})
	}

	if(loading){
		router.push('/login');
	}	

	return(
		<div>
			<Layout className='container' header='Register'>
				<form onSubmit={handleSubmit}>
				  <div className="form-group">
				    <label htmlFor="email">Email address</label>
				    <input type="email" name='email' value={email} onChange={handleChange} className="form-control" id="email" aria-describedby="emailHelp"/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="username">Username</label>
				    <input type="text" name='username' value={username} onChange={handleChange} className="form-control" id="username" aria-describedby="emailHelp"/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="exampleInputPassword1">Password</label>
				    <input type="password" name='password' value={password} onChange={handleChange} className="form-control" id="exampleInputPassword1"/>
				  </div>
				  
				  <button type="submit" className="btn btn-primary">{loading ? 'loading' : 'Signup'}</button>
				</form>
			</Layout>	
		</div>
	)
}

export default Register;