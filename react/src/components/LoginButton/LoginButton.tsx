import "./LoginButton.css";

interface LoginButtonProps {
  linkTo: string;
}

function LoginButton({ linkTo }: LoginButtonProps) {
  return (
    <a href={linkTo} className="header-button">
      Login
    </a>
  );
}

export default LoginButton;
