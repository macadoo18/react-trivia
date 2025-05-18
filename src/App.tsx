import { ChangeEvent, useState } from 'react';
import './App.css';
import TriviaBox from './TriviaBox';
import Button from './Button';
import QUESTIONS from './questions.json';

function App() {
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionNum, setQuestionNum] = useState(0);
  const [showResults, setShowResults] = useState(2);
  const [switchBtn, setSwitchBtn] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  let userAnswer = '';
  const correctAnswer = QUESTIONS[questionIndex].answer;
  const lastQuestionIndex = QUESTIONS.length - 1;

  const handleOnStart = () => {
    setQuestionNum(questionNum + 1)
  }

  const handleOnSelection = (e: ChangeEvent) => {
    userAnswer = (e.target as HTMLInputElement).value;
  };

  const handleOnSubmit = () => {
    if (userAnswer) {
      setSwitchBtn(true);
      setSelectedAnswers([...selectedAnswers, userAnswer]);
      console.log('selected answer', selectedAnswers, userAnswer);
      if (userAnswer === correctAnswer) {
        setScore(score + 1);
        setShowResults(1);
      } else {
        setShowResults(0);
      }
    } else {
      setSwitchBtn(false);
      alert('Please select an answer.');
    }
  };

  const handleOnNext = () => {
    setQuestionNum(questionNum + 1);
    if (questionNum <= lastQuestionIndex) {
      setQuestionIndex(questionIndex + 1);
      setSwitchBtn(false);
      setShowResults(2);
    } else if (questionNum > lastQuestionIndex) {
      setSwitchBtn(true);
      setShowResults(3);
    }
    if (showResults === 3) {
      setSwitchBtn(false);
      setScore(0);
      setQuestionIndex(0);
      setQuestionNum(1);
      setShowResults(2);
    }
  };

  const handleOnBack = () => {
    setQuestionNum(questionNum - 1);
    setQuestionIndex(questionIndex - 1);
    if (selectedAnswers[questionIndex] === correctAnswer) {
      setScore(score - 1);
    }
  };

  const displayBtn = () => {
    let name = '';
    if (questionNum > lastQuestionIndex + 1) {
      name = 'Try again?';
    } else {
      name = 'Next';
    }

    return !switchBtn ? <Button onSubmit={handleOnSubmit} btnName='Submit' /> : <Button onNext={handleOnNext} btnName={name} />;
  };

  const displayBackBtn = () => {
    if (questionNum > 1 && questionNum < lastQuestionIndex) return <Button btnName='Back' onBack={handleOnBack} />;
  };

  return (
    <>
      <header>
        <h1>
          <span className='main-font'>HOW WELL DO YOU KNOW</span> <br />
          <span className='calvin-font'>calvin and hobbes?</span>
        </h1>

        <ul className='status'>
          <li>Question: {questionNum <= lastQuestionIndex + 1 && questionNum}</li>
          <li>Score: {score}</li>
        </ul>
      </header>
      <main>
        <div className='trivia-box-container'>
          <TriviaBox
            questions={QUESTIONS}
            questionIndex={questionIndex}
            onSelection={handleOnSelection}
            displayResults={showResults}
            score={score}
            onStartQuiz={handleOnStart}
          />
          <div className='btn-container'>
            {displayBackBtn()}
            {questionNum > 0 && displayBtn()}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
