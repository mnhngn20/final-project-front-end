import { StripeLogoSVG } from '#/assets/svgs';
import { refetchMeQuery, useAuthorizeCodeMutation } from '#/generated/schemas';
import { Typography } from 'antd';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

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

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-[white] p-8 shadow-header">
        <Typography className="text-center text-base font-semibold text-warning">
          Connecting to Stripe and verify your account...
        </Typography>
        <LoadingOutlined className="text-xl text-primary-color" />
        <StripeLogoSVG />
      </div>
    </div>
  );
}
