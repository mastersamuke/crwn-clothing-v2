import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { CheckoutItemContainer, ImageContainer, Img, Quantity, RemoveButton, Span } from './checkout-item.styles';

const CheckoutItem = ({ cartItem }) => {
   const { name, imageUrl, price, quantity } = cartItem;
   const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);

   const clearItemHandler = () => clearItemFromCart(cartItem);
   const addItemHandler = () => addItemToCart(cartItem);
   const removeItemHandler = () => removeItemFromCart(cartItem);

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