import { useNavigate } from 'react-router-dom';
import { showError } from '../utils/notification';
import {
  getRefreshToken,
  setToken,
  clearToken,
  setRefreshToken,
  clearRefreshToken,
} from '#/shared/utils/token';
import {
  LoginInputDto,
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
} from '#/generated/schemas';

const useAuthentication = () => {
  const navigate = useNavigate();

  const [loginMutation, { loading: loginLoading }] = useLoginMutation();

  const [refreshTokenMutation, { loading: refreshTokenLoading }] =
    useRefreshTokenMutation();

  const [logoutMutation, { loading: logoutLoading }] = useLogoutMutation();

  const refreshToken = () => {
    const refreshTokenKey = getRefreshToken();
    if (refreshTokenKey) {
      refreshTokenMutation({
        onCompleted: res => setToken(res.refreshToken.token),
        variables: {
          input: { refreshToken: refreshTokenKey },
        },
      });
    }
  };

  const handleLogin = (input: LoginInputDto) => {
    loginMutation({
      onCompleted: res => {
        setToken(res.login.token);
        setRefreshToken(res.login.refreshToken);
        navigate('/');
      },
      onError: showError,
      variables: {
        input,
      },
    });
  };
  const handleLogout = () => {
    const refreshTokenKey = getRefreshToken();
    if (refreshTokenKey) {
      logoutMutation({
        onCompleted: () => {
          clearToken();
          clearRefreshToken();
          navigate('/login');
        },
        variables: {
          input: { refreshToken: refreshTokenKey },
        },
      });
    }
  };

  return {
    handleLogin,
    handleLogout,
    loginLoading,
    logoutLoading,
    refreshToken,
    refreshTokenLoading,
  };
};

export default useAuthentication;
