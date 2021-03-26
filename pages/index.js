import Layout from '../components/Layout';
import Link from 'next/link';
import ProductsForHome from '../components/ProductsForHome';
import ProductsByCategories from '../components/ProductsByCategories';
import Search from '../components/Search';

const Index = (props) => {
	return(
		<div>
			<div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
				<div className='start-shopping'>
					<div>
						<h1>Are u ready for summer?</h1>
						<h4>If yes, Let's go</h4>
					</div>
					<Link href='/products?page=1'>
						<a className='btn btn-warning btn-large'>Start Shoping</a>
					</Link>
				</div>
			  <div className="carousel-inner">
			    <div className="carousel-item active">
			      <img height='500px' style={{objectFit: 'cover'}} src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1500&q=80" className="d-block w-100" alt=""/>
			    </div>
			    <div className="carousel-item">
			      <img height='500px' style={{objectFit: 'cover'}} src="https://images.unsplash.com/photo-1486890598084-3673ba1808c1?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1500&q=80" className="d-block w-100" alt=""/>
			    </div>
			    <div className="carousel-item">
			      <img height='500px' style={{objectFit: 'cover'}} src="https://images.unsplash.com/photo-1530870110042-98b2cb110834?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1500&q=80" className="d-block w-100" alt=""/>
			    </div>
			  </div>
			  <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
			    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
			    <span className="sr-only">Previous</span>
			  </a>
			  <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
			    <span className="carousel-control-next-icon" aria-hidden="true"></span>
			    <span className="sr-only">Next</span>
			  </a>
			</div>
			

			<div className='container'>
				<Search/>
				<h1>Our New Products</h1>
				<ProductsForHome/>
			</div>

			<div className='container'>
				<h1>Products by Categories</h1>
				<ProductsByCategories/>
			</div>
		</div>
	)
}

export default Index;