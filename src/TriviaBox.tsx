import { ChangeEvent, useState } from 'react';
import './TriviaBox.css';
import madImage from './assets/mad.png';
import danceImage from './assets/dance.png';
import happyImage from './assets/happy.png';

interface Props {
  questions: Array<qSet>;
  questionIndex: number;
  onSelection: (e: ChangeEvent) => void;
  displayResults: number;
  score: number;
  onStartQuiz: () => void;
}

interface qSet {
  question: string;
  options: string[];
  answer: string;
}

function TriviaBox({ questions, questionIndex, onSelection, displayResults, score, onStartQuiz }: Props) {
  const [start, setStart] = useState(false);
  let results;

  if (displayResults === 1) {
    results = (
      <>
        <h2>Correct!</h2>
        <img src={danceImage} alt='Correct image' />
      </>
    );
  } else if (displayResults === 0) {
    results = (
      <>
        <h2>Wrong</h2>
        <img className='mad-image' src={madImage} alt='Wrong image' />
      </>
    );
  } else if (displayResults === 3) {
    if (score > 6) {
      results = (
        <>
          <h2>Congrats!</h2>
          <p>You scored {score}/10</p>
          <img className='congrats-image' src={happyImage} alt='Good score image' />
        </>
      );
    } else {
      results = (
        <>
          <h2>Shux</h2>
          <p>You scored {score}/10</p>
          <img className='mad-image' src={madImage} alt='Poor score image' />
        </>
      );
    }
  }

  return (
    <>
      {!start ? (
        <div
          className='trivia-start trivia-box'
          onClick={() => {
            setStart(true);
            onStartQuiz();
          }}
        >
          <button>Start</button>
        </div>
      ) : (
        <div className='trivia-questions trivia-box'>
          {questions.map(
            (questionSet, index) =>
              questionIndex === index &&
              displayResults === 2 && (
                <fieldset key={index}>
                  <legend className='question'>{questionSet.question}</legend>
                  {questionSet.options.map((option, i) => (
                    <div className='option' key={i}>
                      <input type='radio' name='option' id={i.toString()} value={option} onChange={onSelection} />
                      <label htmlFor={i.toString()}>{option}</label>
                    </div>
                  ))}
                </fieldset>
              )
          )}
          <div className='results'>{results}</div>
        </div>
      )}
    </>
  );
}

export default TriviaBox;
