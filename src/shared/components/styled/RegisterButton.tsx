import styled from '@emotion/styled';
import { Button, ButtonProps } from 'antd';

const RegisterButton = styled(Button)<ButtonProps & { isRegistered?: boolean }>`
  background-color: ${props =>
    props?.isRegistered ? 'var(--success-light)' : 'var(--primary-color)'};
  color: ${props => (props?.isRegistered ? 'var(--success-heavy)' : 'white')};
  border-color: ${props =>
    props?.isRegistered ? 'var(--success-light)' : 'var(--primary-color)'};
  &:hover,
  &:focus {
    background-color: ${props =>
      props?.isRegistered
        ? 'var(--success-light-hover)'
        : 'var(--primary-color-hover)'};
    color: ${props => (props?.isRegistered ? 'var(--success-heavy)' : 'white')};
    border-color: ${props =>
      props?.isRegistered
        ? 'var(--success-light-hover)'
        : 'var(--primary-color-hover)'};
  }
`;
export default RegisterButton;
