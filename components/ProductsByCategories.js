import {useState, useEffect} from 'react';
import {getCategories, getProductsByCategory} from './apiPost';
import Link from 'next/link';
import ProductsForHome from './ProductsForHome'; 

const ProductsByCategories = props => {
	const [categories, setCategories] = useState([]);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		getCategories().then(res => {
			console.log(res.data);
			setCategories(res.data);
		})
	}, []);

	const handleClick = category => {
		console.log(category)
		getProductsByCategory(category).then(res => {
			console.log(res.data)
			setProducts(res.data);
		})
	}

	const generateProducts = () => {
		const posts = products.map(product => {
			return(
				<div key={product._id} className="card" style={{width: '18rem', height: '50%'}}>
				  <img height='50%' src={`https://surfing-market.herokuapp.com/products/${product._id}/image`} className="card-img-top" alt="..."/>
				  <div className="card-body">
				    <Link href={`/products/product/${product._id}`}><a><h5 className="card-title">{product.name}</h5></a></Link>
				    <p className="card-text">${product.price}</p>
				    {/*<Link href={`/product/${product._id}`} as={`/product/${product._id}`}>Show</Link>*/}
				  </div>
				</div>
			)
		})
		return posts;
	}

	return(
		<div className=''>
			<div>
				<ul class="nav justify-content-center">	
					{categories.map(category => {
						return(
							<li class="nav-item">
							  <button onClick={() => handleClick(category)} className="btn mr-5 btn-warning btn-large">{category}</button>
							</li>
						)
					})}
				</ul>
			</div>
			<div className='row mt-3'>
				{products.length ? (generateProducts()) : <ProductsForHome/>}
			</div>
		</div>
	)
}



export default ProductsByCategories;