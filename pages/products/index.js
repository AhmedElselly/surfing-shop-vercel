import {useState, useEffect} from 'react';
import Layout from '../../components/Layout';
import {products} from '../../components/apiPost';
import Link from 'next/link';
import Router, { withRouter } from 'next/router'
import Search from '../../components/Search';
import ReactPaginate from 'react-paginate';

const Products = (props) => {
	console.log(props.pros);
	const [isLoading, setLoading] = useState(false); //State for the loading indicator
    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

    useEffect(() => { //After the component is mounted set router event handlers
        Router.events.on('routeChangeStart', startLoading); 
        Router.events.on('routeChangeComplete', stopLoading);

        return () => {
            Router.events.off('routeChangeStart', startLoading);
            Router.events.off('routeChangeComplete', stopLoading);
        }
    }, [])

	const generateProducts = () => {
		const allProds = props.pros.docs.map(product => {
			console.log(product)
			return (
				<div key={product._id} className="card" style={{width: '18rem', height: '50%'}}>
				  <img height='50%' src={`https://surfing-market.herokuapp.com/products/${product._id}/image`} className="card-img-top" alt="..."/>
				  <div className="card-body">
				    <Link href={`/products/product/${product._id}`}><a><h5 className="card-title">{product.name}</h5></a></Link>
				    <p className="card-text">${product.price}</p>
				    {/*<Link href={`/product/${product._id}`} as={`/product/${product._id}`}>Show</Link>*/}
				  </div>
				</div>
			)
		});
		return allProds;
	}

	const pagginationHandler = (page) => {
        const currentPath = props.router.pathname;
        const currentQuery = props.router.query;
        currentQuery.page = page.selected + 1;

        props.router.push({
            pathname: currentPath,
            query: currentQuery,
        });

    };
	
	let content = null;

	if(isLoading){
		content = <div>Loading...</div>;
	} else {
		content = (
			<div className='row'>
				{props.pros.docs.map(product => {
						console.log(product)
						return (
							<div key={product._id} className="mr-4 card" style={{width: '18rem', height: '50%'}}>
							  <img height='50%' style={{objectFit: 'cover'}} src={`https://surfing-market.herokuapp.com/products/${product._id}/image`} className="card-img-top" alt="..."/>
							  <div className="card-body">
							    <Link href={`/products/product/${product._id}`}><a><h5 className="card-title">{product.name}</h5></a></Link>
							    <p className="card-text">${product.price}</p>
							    {/*<Link href={`/product/${product._id}`} as={`/product/${product._id}`}>Show</Link>*/}
							  </div>
							</div>
						)
					})}
			</div>
		)
	}

	return(
		<div>
			<Layout className='container' header='Products'>
				<ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    activeClassName={'active'}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
    				pageClassName={'page-item'}
    				previousClasses={'page-item'}
    				previousLinkClassName={'page-link'}
    				nextClasses={'page-item'}
    				nextLinkClassName={'page-link'}
    				pageLinkClassName={'page-link'}
                    initialPage={props.currentPage - 1}
                    pageCount={props.pageCount}
                    marginPagesDisplayed={10}
                    pageRangeDisplayed={5}
                    onPageChange={pagginationHandler}
                />
				<div className='row'>
					{content}
				</div>
			</Layout>
		</div>
	)
}

export const getServerSideProps = async (ctx) => {
	let page = ctx.query.page || 1;
	const prods = await products(page);

	return {
		props:{
			pros: prods.data,
			totalCount: prods.data.totalDocs,
	        pageCount: prods.data.totalPages,
	        currentPage: prods.data.page,
	        perPage: prods.data.limit,
	    }
	};
}

export default withRouter(Products);