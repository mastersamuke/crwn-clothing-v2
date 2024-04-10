import styled from 'styled-components';

const Width23 = '23%';

export const Span = styled.span`
width: ${Width23};
`;
export const RemoveButton = styled.div`  
  padding-left: 12px;
    cursor: pointer;
`;

export const Quantity = styled(Span)`  
    display: flex;
    .arrow {
      cursor: pointer;
    }

    .value {
      margin: 0 10px;
    }
`;

export const Img = styled.img`
width: 100%;
height: 100%;
`;

export const ImageContainer = styled.div`  
  width: ${Width23};
    padding-right: 15px;
`;

export const CheckoutItemContainer = styled.div`
width: 100%;
display: flex;
min-height: 100px;
border-bottom: 1px solid darkgrey;
padding: 15px 0;
font-size: 20px;
align-items: center;  
`;