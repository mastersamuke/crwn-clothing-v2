import { BackgroundImage, Body, DirectoryItemContainer } from './directory-item.styles';
import { useNavigate } from 'react-router-dom';

const CategoryItem = ({ category }) => {
   const { title, id, imageUrl, route } = category;
   const navigate = useNavigate();

   const onNavigateHandler = () => navigate(route);
   return (
      <DirectoryItemContainer key={id} onClick={onNavigateHandler}>
         <BackgroundImage
            $imageUrl={imageUrl} />
         <Body>
            <h2>{title}</h2>
            <p>Shop Now</p>
         </Body>
      </DirectoryItemContainer>
   );
};

export default CategoryItem;