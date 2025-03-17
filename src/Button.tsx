interface Props {
  onSubmit?: () => void;
  onNext?: () => void;
  btnName: string;
}

function Button({ onNext, onSubmit, btnName }: Props) {
  return (
    <>
      <button className="submit-btn"
        onClick={() => {
          if (onSubmit) onSubmit();
          if (onNext) onNext();
        }}
      >
        {btnName}
      </button>
    </>
  );
}

export default Button;
