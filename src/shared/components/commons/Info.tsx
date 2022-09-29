import Avatar from './Avatar';
interface Props {
  avatar: string | undefined | null;
  fullName: string | undefined | null;
  email: string | undefined | null;
}
function Info({ avatar, fullName, email }: Props) {
  return (
    <div className="flex w-full items-center">
      <div>
        <Avatar src={avatar} name={fullName ?? email} />
      </div>
      <div className="w-full px-5">
        <strong className="primary max-w-64 block truncate">{fullName}</strong>
        <p className="max-w-64 truncate">{email}</p>
      </div>
    </div>
  );
}

export default Info;
