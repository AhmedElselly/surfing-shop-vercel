import {useState} from 'react';
import {reset, authenticate} from '../../components/helpers';
import {useRouter} from 'next/router';

const Reset = props => {
	const router = useRouter();
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loaded, setLoaded] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');
	const handleChange = e => {
		if(e.target.name === 'password'){
			setPassword(e.target.value)
		}
		if(e.target.name === 'confirmPassword'){
			setConfirmPassword(e.target.value);
		}
	}

	const handleSubmit = e => {
		e.preventDefault();
		reset( password, confirmPassword, props.token).then(res => {
			console.log(res.data);
			// console.log(res.error);
			if(res.data.error){
				setError(res.data.error);
			} else {
				authenticate(res.data, () => {
					setMessage('Signing in...');
					setLoaded(true);
				})	
			}
			
		})
	}
	if(loaded){
		router.push('/products');
	}
	return(
		<div className='container'>
			{error && (
				<div class="alert alert-danger" role="alert">
				  {error}
				</div>
			)}
			{message && (
				<div class="alert alert-success" role="alert">
				  {message}
				</div>
			)}
			<form className='form-group' onSubmit={handleSubmit}>
				<label htmlFor="">Password</label>
				<input className='form-control' type="password" value={password} name='password' onChange={handleChange} placeholder='Password'/>
				<label htmlFor="">Confirm Password</label>
				<input className='form-control' type="password" value={confirmPassword} name='confirmPassword' onChange={handleChange} placeholder='Confirm Password'/>
				<button className='btn mt-2 btn-primary'>Reset Password</button>
			</form>			
		</div>
	)
}

export const getServerSideProps = (ctx) => {
	const {token} = ctx.query;
	return {props: {token}};
}

export default Reset;