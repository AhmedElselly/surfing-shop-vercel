import {useState, useEffect} from 'react';
import {searching, getCategories} from './apiPost';
import Link from 'next/link';

const Search = props => {
	const [search, setSearch] = useState('');
	const [value, setValue] = useState('');
	const [categories, setCategories] = useState([]);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		getCategories().then(res => {
			console.log(res.data);
			setCategories(res.data);
			setValue('All')
		})
	}, [])

	const handleCategoryChange = e => {
		console.log(e.target.value)
		setValue(e.target.value);
	}

	const handleSubmit = e => {
		e.preventDefault();
		searching(search, value).then(res => {
			console.log(res.data);
			setPosts(res.data);
		})
	}

	const handleChange = e => {
		setSearch(e.target.value);
	}

	const generateSearchResult = () => {
		return posts.map(product => {
			return(
				<div key={product._id} className="card" style={{width: '18rem', height: '50%'}}>
				  <img height='50%' src={`https://surfing-market.herokuapp.com/products/${product._id}/image`} className="card-img-top" alt="..."/>
				  <div className="card-body">
				    <Link href={`/products/${product._id}`}><a><h5 className="card-title">{product.name}</h5></a></Link>
				    <p className="card-text">${product.price}</p>
				    {/*<Link href={`/product/${product._id}`} as={`/product/${product._id}`}>Show</Link>*/}
				  </div>
				</div>
		)})
	}

 	return(
 		<div className='mb-5 mt-5'>
 			<form className='form-inline' onSubmit={handleSubmit}>
 				<select name="category" className='custom-select' onChange={handleCategoryChange}>
 					<option value="All">All Categories</option>
 					{categories.map(value => {
 						return <option value={value}>{value}</option>
 					})}
 				</select>
 				<input 
 					type="text"
 					className='form-control'
 					name='search'
 					value={search}
 					onChange={handleChange}
 					placeholder='Search Products'
 				/>
 				<button className='btn btn-primary'>Search</button>
			</form>
			<div>
			{posts.length != 0 && (
				<div>
					<h1>Search Result</h1>
					<div className='row'>
						{generateSearchResult()}
					</div>
				</div>
			)}				
			</div>
 		</div>
	)
}

export default Search;