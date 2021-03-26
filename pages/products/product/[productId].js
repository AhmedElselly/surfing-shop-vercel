import {useState, useEffect} from 'react';
import {getProduct, createReview, remove} from '../../../components/apiPost';
import Link from 'next/link';
import Image from 'next/image';
import {useRouter, withRouter} from 'next/router';
import Review from '../../../components/Review';
import ReactStars from "react-rating-stars-component";
import {isAuthenticated} from '../../../components/helpers';
// import ReactMapGL, {Marker} from 'react-map-gl';
import {API} from '../../../config';
import {addToCart} from '../../../components/cartHelpers';
import MapGL, {Marker, NavigationControl} from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


const Product = (props) => {
	
	const product = props.product;
	// const [product, setProduct] = useState({});
	const [viewport, setViewport] = useState({
	    longitude: product.coordinates[0],
	    latitude: product.coordinates[1],
	    zoom: 6
	  });
	const [text, setText] = useState('');
	const [description, setDescription] = useState('');
	const [rating, setRating] = useState('');
	const [loaded, setLoaded] = useState(false);
	const [redirectToPros, setRedirectToPros] = useState(false);
	const [reviews, setReviews] = useState(product.reviews);
	const [user, setUser] = useState({});
	const router = useRouter();
console.log('props.router.query', router.query)
	useEffect(() => {
		if(isAuthenticated()){
			const {token} = isAuthenticated();
			setUser(isAuthenticated().user);	
		} 
		
		setDescription(props.product.body);
	}, [])

	const style = {
	  padding: '10px',
	  color: '#fff',
	  cursor: 'pointer',
	  background: '#1978c8',
	  borderRadius: '6px'
	};

	const handleReviewChange = e => {
		setText(e.target.value);
	}

	const ratingChanged = (newRating) => {
  	console.log(newRating);
		setRating(newRating);
	}

	const handleRemove = () => {
		
		const {token} = isAuthenticated();
		remove(user._id, token, product._id).then(res => {
			console.log(res.data);
			setRedirectToPros(true);
		})
	}

	const handleSubmitReview = e => {
		e.preventDefault();
		if(isAuthenticated()){
			const {token} = isAuthenticated();
			const {_id} = isAuthenticated().user;
			createReview(product._id, _id, text, rating, token).then(res => {
				console.log(res.data);
				// router.push(`/products/${product._id}`);
				setReviews([...reviews, res.data]);
				setText('')
				
			});	
		}
		
	}


	const generateReviews = () => {
		const allReviews = reviews.map(review => {
			return <Review key={review._id} text={review.text} author={review.author} />
		})
		return allReviews;
	}

	const handleCart = product => {
		addToCart(product, () => {
			setLoaded(true)
		});
	}

	console.log(reviews)

	if(loaded){
		router.push('/cart');
	}

	if(redirectToPros){
		router.push('/products')
	}
	
	return(
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-4'>
					<div key={product._id} className="card" style={{maxWidth: '18rem'}}>
					  <img  src={`https://surfing-market.herokuapp.com/products/${product._id}/image`} className="card-img-top" alt="..."/>
					  <div className="card-body">
					    <Link href={`/products/product/${product._id}`}><a><h5 className="card-title">{product.name}</h5></a></Link>
					    <p className="card-text">${product.price}</p>
					    
					    <button onClick={e => handleCart(product)} className='ml-3 btn btn-warning' >Add To Cart</button>
					    {user._id === product.author._id && (
					    	<div>
					    	<Link href={`/update-product?productId=${product._id}`} as={`/update-product/${product._id}`}><a className='btn btn-primary'>Edit</a></Link>
					    	<button className='btn btn-danger' onClick={handleRemove} >Delete</button>
					    	</div>
				    	)}
					  </div>
					</div>
				</div>
				<div className='col-md-8'>
				<MapGL
				  style={{ width: '100%', height: '400px' }}
				  mapStyle='mapbox://styles/mapbox/streets-v11'
				  accessToken={`pk.eyJ1IjoiYWhtZWRlbHNlbGx5IiwiYSI6ImNra3o0cnpieTBteWQyb3AwZ2ZlZDBueW8ifQ.5s7V5rO2N6vvscUDuBUWiw`}
				  latitude={viewport.latitude}
				  longitude={viewport.longitude}
				  zoom={viewport.zoom}
				>
			  <NavigationControl showCompass showZoom position='top-right' />

				<Marker
				    longitude={viewport.longitude}
				    latitude={viewport.latitude}
			    >
					<svg viewBox="0 0 24 24" width="44" height="44" stroke="blue" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" ><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
				</Marker>
				</MapGL>
					
				</div>
			</div>
			<div className='mt-5'>
				<h4>Description</h4>
				<p>{description}</p>
			</div>
			<div className='mt-5'>
				<h1>Reviews</h1>
				{!isAuthenticated() ? (
					<h3>Login to create reviews.</h3>
				):(
					<div style={{width: '50%'}}>
						<form onSubmit={handleSubmitReview}>
							<div className="form-group">
					    <label htmlFor="review">Create Review</label>
					    <ReactStars
						    count={5}
						    onChange={ratingChanged}
						    size={24}
						    name='rating'
						    activeColor="#ffd700"
						  />
					    <textarea className="form-control" name='text' value={text} onChange={handleReviewChange} id="review" rows="3"></textarea>
					  	<button className='btn btn-primary'>Post Review</button>
					  </div>
						</form>
					</div>
				)}
			</div>
			{reviews.length ? (
				<div>
					{generateReviews()}
				</div>	
			):(
				<h4>No reviews posted yet!</h4>
			)}
		</div>
	)
}

export const getServerSideProps = async (ctx) => {
	// const token = ctx.req.headers.cookie.split('=')[1];
	const res = await getProduct(ctx.query.productId);
	
	return {props: {product: res.data}};
}

export default withRouter(Product);