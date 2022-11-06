import { refetchMeQuery, useAuthorizeCodeMutation } from '#/generated/schemas';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ConnectingStripe() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const code = new URLSearchParams(search).get('code');
  const [authorizeCode] = useAuthorizeCodeMutation({
    onCompleted() {
      navigate('/stripe-connect/success');
    },
    refetchQueries: [refetchMeQuery()],
  });

  useEffect(() => {
    code && authorizeCode({ variables: { code: String(code) } });
  }, [code, authorizeCode]);

  return <div>Connecting Stripe</div>;
}
