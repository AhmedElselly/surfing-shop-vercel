import Link from 'next/link';
import {useRouter} from 'next/router';
import {getProductsByUser} from '../../../components/apiPost';
import {useState, useEffect} from 'react';
import {isAuthenticated, getCookie} from '../../../components/helpers';

const ProductsByUser = (props) => {
	console.log(props.products);
	const router = useRouter();
	const [user, setUser] = useState({});

	useEffect(() => {
		if(isAuthenticated()){
			setUser(isAuthenticated().user);
		} else {
			router.push('/')
		}
	}, [])

	const generateProducts = () => {
		const allProducts = props.products.map(product => {
			return (
				<div key={product._id} className="card" style={{width: '18rem', height: '50%'}}>
				  <img height='50%' src={`https://surfing-market.herokuapp.com/products/${product._id}/image`} className="card-img-top" alt="..."/>
				  <div className="card-body">
				    <Link href={`/products/product/${product._id}`}><a><h5 className="card-title">{product.name}</h5></a></Link>
				    <p className="card-text">${product.price}</p>
				  </div>
				</div>
			)	
		})
		return allProducts;
	}
	return (
		<div className='container'>
			<h1>{user.username}'s products</h1>
			<div className='row'>
				{props.products.length ? (generateProducts()): (
					<h3>You don't have products yet!</h3>
				)}
			</div>
		</div>
	)
}

export const getServerSideProps = async (ctx) => {
	const token = await ctx.req.headers.cookie.split('=')[1];
	console.log('token', getCookie('token'))
	// console.log('token', token)
	const res = await getProductsByUser(ctx.query.userId, token);
	return {props: {products: res.data}};
}

export default ProductsByUser;