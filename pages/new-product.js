import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'; 
import Layout from '../components/Layout';
import Redirect from '../components/Redirect';
import {isAuthenticated, getCookie} from '../components/helpers';
import {create} from '../components/apiPost';

const Create = () => {
	const [values, setValues] = useState({
		name: '',
		image: '',
		body: '',
		price: '',
		category: '',
		location: ''
	})
	const [loading, setLoading] = useState(false);
	const router = useRouter();
  useEffect(() => {
    !isAuthenticated() && router.push('/login');
  }, [])

  const handleChange = e => {
  	const value = e.target.name === 'image' ? e.target.files[0] : e.target.value;
  	setValues({...values, [e.target.name]: value});
  }

  const handleSubmit = e => {
  	e.preventDefault();
  	const formData = new FormData();
  	const {
  		name, 
  		image,
  		price, 
  		body,
  		category,
  		location
  	} = values;
  	formData.append('name', name);
  	formData.append('image', image);
  	formData.append('price', price);
  	formData.append('body', body);
  	formData.append('location', location);
  	formData.append('category', category);
  	const {token} = isAuthenticated();
  	const {_id} = isAuthenticated().user;
  	create(formData, _id, token).then(res => {
  		console.log(res.data);
  	})
  }

	return(
		<div>
			<Layout className='container' header='Create New Product'>
				<form onSubmit={handleSubmit}>
				  <div className="form-group">
				    <label htmlFor="name">Name</label>
				    <input type="text" name='name' value={values.name} onChange={handleChange} className="form-control" id="name" aria-describedby="emailHelp"/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="image">Product Image</label>
				    <input type="file" accept='image/*' name='image' onChange={handleChange} className="form-control" id="image" aria-describedby="emailHelp"/>
				    {values.image ? values.image.name : null}
				  </div>
				  <div className="form-group">
				    <label htmlFor="price">Product Price</label>
				    <input type="number" name='price' value={values.price} onChange={handleChange} className="form-control" id="image" aria-describedby="emailHelp"/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="body">Description</label>
				    <input type="text" name='body' value={values.body} onChange={handleChange} className="form-control" id="body" aria-describedby="emailHelp"/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="category">Category</label>
				    <input type="text" name='category' value={values.category} onChange={handleChange} className="form-control" id="category"/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="location">Location</label>
				    <input type="text" name='location' value={values.location} onChange={handleChange} className="form-control" id="location"/>
				  </div>
				  
				  <button type="submit" className="btn btn-primary">{loading ? 'loading' : 'Create'}</button>
				</form>
			</Layout>	
		</div>
	)
}


export default Create;