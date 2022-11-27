import { StripeLogoSVG, TickCircleFilledSVG } from '#/assets/svgs';
import { Button, Typography, Image } from 'antd';
import Logo from '#/assets/images/logo.png';
import { useNavigate } from 'react-router-dom';

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-2 rounded-xl bg-[white] py-8 px-4 shadow-header">
        <div className="flex flex-col gap-2">
          <Typography className="text-center text-3xl font-bold text-success">
            Congratulation!
          </Typography>
          <Typography className="text-center text-base font-semibold">
            Your account has successfully linked to Stripe
          </Typography>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Image width={100} src={Logo} alt="Logo" preview={false} />
          <ul className="flex items-center gap-2">
            <li className="h-4 w-4 rounded-full bg-success"></li>
            <li className="h-4 w-4 rounded-full bg-success"></li>
            <li className="h-4 w-4 rounded-full bg-success"></li>
            <li className="h-4 w-4 rounded-full bg-success"></li>
            <li className="h-4 w-4 rounded-full bg-success"></li>
            <TickCircleFilledSVG
              className="text-success"
              width={24}
              height={24}
            />
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
