import React, { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import {useRouter, withRouter} from 'next/router';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

import {isAuthenticated, logout} from './helpers';
import {cartLength} from './cartHelpers';
import CartItemsLength from './CartItemsLength';
import { useContext } from 'react';
import CartContext from './cartContext';

const Menu = (props) => {
  const { cart } = useContext(CartContext);

  const [length, setLength] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const toggle = () => setIsOpen(!isOpen);
  useEffect(() => {

    setLength(cartLength);
  }, []);
  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link href="/" passHref><NavLink className='font-weight-bold brand-font'>Surfing</NavLink></Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link href="/" passHref><NavLink>
                <i className="fas fa-home"></i> Home
              </NavLink></Link>
            </NavItem>
            <NavItem>
              <Link href="/products?page=1" passHref><NavLink><i className="fas fa-blender"></i> Products</NavLink></Link>
            </NavItem>
            
            {!isAuthenticated() && (
              <Fragment>
                <NavItem>
                  <Link href="/login" passHref><NavLink>Login</NavLink></Link>
                </NavItem>
                <NavItem>
                  <Link href="/register" passHref><NavLink>Register</NavLink></Link>
                </NavItem>
              </Fragment>
            )}

            {isAuthenticated() && (
              <Fragment>
                <NavItem>
                  <Link className='nav-link pointer-link' href={`/profile/${isAuthenticated().user._id}`}>
                    <NavLink>
                      <i className="fas fa-user"></i> {isAuthenticated().user.username}
                    </NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/new-product" passHref><NavLink><i className="fas fa-pen"></i> Create Product</NavLink></Link>
                </NavItem>
                
                <NavItem  style = {{cursor: 'pointer'}} >
                  <span className="nav-link pointer-link" onClick={() => logout(() => {
                    router.push('/login');
                  })}><i className="fas fa-sign-out-alt"></i> Logout</span>
                </NavItem>
              </Fragment>
            )}
            
              <NavItem>
              <Link href="/cart" passHref>
                <NavLink>
                  <i className="fas fa-cart-plus"></i> <span style={{background: 'gold', color: 'black'}} class="badge">{length}</span>
                </NavLink>
              </Link>
            </NavItem>
          </Nav>          
        </Collapse>
      </Navbar>
    </div>
  );
}

export default withRouter(Menu);