import styled from '@emotion/styled';
import { Button, ButtonProps } from 'antd';

const ButtonBrown = styled(Button)<
  ButtonProps & { type?: 'primary' | 'outline' }
>`
  background-color: ${props =>
    props.type === 'primary' ? 'var(--brown-dark)' : ''} !important;
  border-color: var(--brown-dark) !important;
  color: ${props =>
    props.type === 'primary' ? 'white' : 'var(--brown-dark)'} !important;
  span {
    color: ${props =>
      props.type === 'primary' ? 'white' : 'var(--brown-dark)'} !important;
  }
  &:hover {
    opacity: 0.9;
  }
`;

export default ButtonBrown;
