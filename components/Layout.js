import Search from './Search';
import Navbar from './Navbar';

const Layout = (props) => {
	
	return(
		<div className={props.className}>
			<Search/>
			<h1>{props.header}</h1>
			{props.children}
		</div>
	)
}

export default Layout;