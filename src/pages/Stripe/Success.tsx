import { StripeLogoSVG, TickCircleFilledSVG } from '#/assets/svgs';
import { Button, Typography, Image } from 'antd';
import Logo from '#/assets/images/logo.png';
import { useNavigate } from 'react-router-dom';

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-2 rounded-xl bg-[white] py-8 px-24 shadow-header">
        <TickCircleFilledSVG className="text-success" width={24} height={24} />
        <Typography className="text-2xl font-bold text-success">
          Success
        </Typography>
        <Typography>Your account successfully linked to Stripe</Typography>
        <div className="flex items-center gap-6">
          <Image width={100} src={Logo} alt="Logo" preview={false} />
          <ul className="flex gap-1">
            <li className="h-2 w-2 rounded-full bg-success"></li>
            <li className="h-2 w-2 rounded-full bg-success"></li>
            <li className="h-2 w-2 rounded-full bg-success"></li>
            <li className="h-2 w-2 rounded-full bg-success"></li>
            <li className="h-2 w-2 rounded-full bg-success"></li>
          </ul>
          <StripeLogoSVG />
        </div>
        <Button
          type="primary"
          className="font-bold"
          onClick={() => navigate('/')}
        >
          Complete
        </Button>
      </div>
    </div>
  );
}
