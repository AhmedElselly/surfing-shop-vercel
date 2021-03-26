import App from 'next/app';
import {useEffect, useState} from 'react';
import Navbar from '../components/Navbar';
import {getCartItems} from '../components/cartHelpers';
import cartcontext from '../components/cartContext';
import '../styles.css';

function MyApp({ Component, pageProps }) {
	// state = {
 //    cart : [],
 //    carttotal : 0
 //  }
 const [cart, setCart] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
      setCart(cart);
    }
  },[]);
  return (
  	<cartcontext.Provider value={{cart: cart}}>
  		<Navbar/>
  		<Component {...pageProps} />
  	</cartcontext.Provider>
	)
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.

// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp