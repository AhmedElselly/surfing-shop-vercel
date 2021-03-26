import {useState, useEffect} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {ordersList, getStatuses, updateOrderStatus} from '../../components/apiPost';
import {getCookie, isAuthenticated} from '../../components/helpers';
import Cookies from 'js-cookie';
import ProductStatusEdit from '../../components/ProductStatusEdit';

const Orders = (props) => {

	console.log(props.orders.products);
	const router = useRouter();
	const [orders, setOrders] = useState([]);
	const [statuses, setStatuses] = useState([]);
	const [preStatus, setPreStatus] = useState(null);
	useEffect(() => {
		if(isAuthenticated()){
			setOrders(props.orders)
			const {token} = isAuthenticated();
			getStatuses(token).then(res => {
				console.log('status', res.data);
				setStatuses(res.data);
			})
		} else {
			router.push('/');
		}
		
	}, [props.orders]);

	const handleStatusChange = (e, order, product, index) => {
		const {token} = isAuthenticated();
		const {_id} = isAuthenticated().user;
		// console.log('productId', productId);
		// console.log(order.products[index].quantity * order.products[index].product.price)
		const amount = order.products[index].quantity * order.products[index].product.price;

		updateOrderStatus(token, _id, order._id, product._id, e.target.value, amount).then(res => {
			console.log(res.data);
			setPreStatus(e.target.value);
		});

	}

	const status = (order, product, idx) => {
		
		return(
			<div>
			<h5 className='mark mb-4'>Status: {!preStatus ? (product.status):(preStatus)}</h5>
				<select name="status" onChange={e => handleStatusChange(e, order, product, idx)} id="">
					{statuses.map(value => {
						return(
							<option value={value}>{value}</option>
						)
					})}
				</select>
			</div>
		)
	}

	const generateOrders = () => {
		const allOrders = orders.map((order, index) => {
			return (
				<div>
					<div className="card text-center">

					  <div className="card-header">
					    Order ID: #{order._id}
					  </div>
					  
					  {/*<ProductStatusEdit  />*/}
					  {order.products.map((product, idx) => {
					  	console.log('product', product)
					  	return(
					  		<div>
					  		{product.author === isAuthenticated().user._id && (
							  		<div className="card-body">
							  			{status(order, product, idx)}
									    <h5 className="card-title">Title: {product.product.name}</h5>
									    <p className="card-text">Description: {product.product.body}</p>
									    <p className="card-text">Price: ${product.product.price}</p>
									    <p className="card-text">Quantity: {product.quantity}</p>
									    <Link href={`/product?productId=${product.product._id}`} as={`/product/${product.product._id}`}><a className="btn btn-primary">Product Page</a></Link>
									    <hr/>
									  </div>)}
							</div>
				  		)
					  })}
					  
					  <div className="card-footer text-muted">
					    Delivery Address
					    <div>
					    Street: {order.deliveryAddress.street}
					    </div> 
					    <div>
					    City: {order.deliveryAddress.city} 
					    </div>
					    <div>
					    State: {order.deliveryAddress.state}
					    </div>
					    <div>
					    Country: {order.deliveryAddress.country} 
					    </div>
					  </div>
					</div>
				</div>
			)
		})
		return allOrders;
	}
	return (
		<div>
			{!orders.length ? (
				<h1>Your orders is empty.</h1>
			):(
				<div>
					<h1>You have {orders.length} {orders.length === 1 ? 'order':'orders'}.</h1>
					{generateOrders()}
				</div>
			)}
			
			
		</div>
	)
}

export const getServerSideProps = async (ctx) => {
	const token = await ctx.req.headers.cookie.split('=')[1];
	const res = await ordersList(ctx.query.userId, token);
	return {props: {orders: res.data}};
}

export default Orders;