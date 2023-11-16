import "./BackButton.css";

interface BackButtonProps {
  linkTo: string;
}

function BackButton({ linkTo }: BackButtonProps) {
  return (
    <a href={linkTo} className="header-button km-button">
      Vissza
    </a>
  );
}

export default BackButton;
