import {useState, useEffect} from 'react';
import {resetPassword} from '../components/helpers';

const ResetPassword = props => {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const handleChange = e => {
		setEmail(e.target.value);
	}

	const handleSubmit = e => {
		e.preventDefault();
		resetPassword(email).then(res => {
			console.log(res.data)
			setMessage(res.data.message);
		})
	}

	return(
		<div className='container'>
			{message && (
				<div class="alert alert-success" role="alert">
				  {message}
				</div>
			)}
			<form className='form-group' onSubmit={handleSubmit}>
				<label htmlFor="">Reset Password</label>
				<input className='form-control' type="email" name='email' value={email} onChange={handleChange} placeholder='example@email.com'/>
				<button className='btn mt-2 btn-primary'>Reset Password</button>
			</form>
		</div>	
	)
}

export default ResetPassword;