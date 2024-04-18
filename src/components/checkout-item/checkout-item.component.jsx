import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import { CheckoutItemContainer, ImageContainer, Img, Quantity, RemoveButton, Span } from './checkout-item.styles';

const CheckoutItem = ({ cartItem }) => {
   const { name, imageUrl, price, quantity } = cartItem;
   const cartItems = useSelector(selectCartItems);
   const dispatch = useDispatch();

   const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));
   const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
   const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));

   return (
      <CheckoutItemContainer>
         <ImageContainer>
            <Img src={imageUrl} alt={`${name}`} />
         </ImageContainer>
         <Span>{name}</Span>
         <Quantity className='quantity'>
            <div className='arrow' onClick={removeItemHandler}>
               &#10094;
            </div>
            <span className='value'>{quantity}</span>
            <div className='arrow' onClick={addItemHandler}>
               &#10095;
            </div>
         </Quantity>
         <Span>{price}</Span>
         <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
      </CheckoutItemContainer>
   );
};

export default CheckoutItem;