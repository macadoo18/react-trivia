interface Props {
  onSubmit?: () => void;
  onNext?: () => void;
  onBack?: () => void;
  btnName: string;
}

function Button({ onNext, onSubmit, onBack, btnName }: Props) {
  return (
    <>
      <button className="submit-btn"
        onClick={() => {
          if (onSubmit) onSubmit();
          if (onNext) onNext();
          if (onBack) onBack();
        }}
      >
        {btnName}
      </button>
    </>
  );
}

export default Button;
