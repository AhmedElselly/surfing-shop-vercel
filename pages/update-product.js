import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'; 
import Layout from '../components/Layout';
import Redirect from '../components/Redirect';
import {isAuthenticated, getCookie} from '../components/helpers';
import {update, getProduct} from '../components/apiPost';
import axios from 'axios';

const Update = (props) => {
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
    // getProduct()
    const {name, body, price, category, location} = props.product;
    setValues({...values, name, body, price, category, location});
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
  	console.log(props.product._id)
  	update(_id, token, props.product._id, formData).then(res => {
  		console.log(res.data);
  		setLoading(true);
  	})
  }

  if(loading){
  	// router.push(`http://localhost:3000/product/${props.product._id}`);
  }

	return(
		<div>
			<Layout className='container' header='Update New Product'>
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
				  
				  <button type="submit" className="btn btn-primary">{loading ? 'loading' : 'Update'}</button>
				</form>
			</Layout>	
		</div>
	)
}


export const getServerSideProps = async (ctx) => {
  const {productId} = ctx.query;
  console.log(ctx.query)
  // const token = await ctx.req.headers.cookie.split('=')[1];
  const token = ctx.req.headers.cookie.split('=')[1];

  const res = await getProduct(productId, token);

  return { props: {product: res.data}};
}


export default Update;