import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';
import {
   LogoContainer,
   NavigationContainer,
   NavLinks,
   NavLink
} from './navigation.styles';

import { signOutStart } from '../../store/user/user.action';

import CrwnLogo from '../../assets/crown.svg?react';

const Navigation = () => {
   const currentUser = useSelector(selectCurrentUser);
   const isCartOpen = useSelector(selectIsCartOpen);
   const dispatch = useDispatch();

   const signOutUser = () => dispatch(signOutStart());

   return (
      <Fragment>
         <NavigationContainer>
            <LogoContainer to='/'>
               <CrwnLogo className='logo' />
            </LogoContainer>
            <NavLinks>
               <NavLink to='/shop'>
                  SHOP
               </NavLink>
               {currentUser ? (
                  <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
               ) : (
                  <NavLink className='nav-link' to='/auth'>SIGN IN</NavLink>
               )}
               <CartIcon />
            </NavLinks>
            {isCartOpen && <CartDropdown />}
         </NavigationContainer>
         <Outlet />
      </Fragment>
   );
};

export default Navigation;