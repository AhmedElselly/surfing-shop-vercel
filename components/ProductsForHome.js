import {useEffect, useState} from 'react';
import {productsForHome} from './apiPost';
import Link from 'next/link';

const ProductsForHome = props => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		productsForHome().then(res => {
			console.log(res.data);
			setPosts(res.data);
		})
	}, []);

	const showPosts = () => {
		return posts.map(product => {
			return(
				<div key={product._id} className="card mr-5" style={{width: '18rem', height: '50%'}}>
				  <img height='50%' src={`https://surfing-market.herokuapp.com/products/${product._id}/image`} className="card-img-top" alt="..."/>
				  <div className="card-body">
				    <Link href={`/products/product/${product._id}`}><a><h5 className="card-title">{product.name}</h5></a></Link>
				    <p className="card-text">${product.price}</p>
				    {/*<Link href={`/product/${product._id}`} as={`/product/${product._id}`}>Show</Link>*/}
				  </div>
				</div>
			)
		})
	}

	return(
		<div className='row'>
			{showPosts()}
		</div>
	)
}


export default ProductsForHome;