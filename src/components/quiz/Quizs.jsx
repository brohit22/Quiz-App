import React, { useEffect, useState } from 'react';
import geoQuestions from '../../assets/geoQuestion.json';
import techQuestions from '../../assets/techQuestion.json';
import marvelQuestions from '../../assets/marvelQuestion.json';
import mathQuestions from '../../assets/mathQuestion.json';
import sportsQuestions from '../../assets/sportsQuestion.json';
import Quiz from './Quiz';
import { useParams, useNavigate } from 'react-router-dom';
import nextbutton from '../../assets/next-icon.svg';
import Time from './Time';

const Quizs = () => {
  const navigate = useNavigate();
  const { category, name } = useParams();
  const [currentqt, setcurrentqt] = useState(0);
  const [score, setscore] = useState(0);
  const [isdisabled, setisdisabled] = useState(true);
  const [selected, setselected] = useState();
  const [currentQuestions, setCurrentQuestions] = useState([]);

  useEffect(() => {
    const encodeScore = btoa(score.toString());
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set('quiz', encodeScore);
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${urlSearchParams}`
    );
  }, [score]);

  useEffect(() => {
    // Set questions based on the selected category
    switch (category) {
      case 'tech':
        setCurrentQuestions(techQuestions);
        break;
      case 'geo':
        setCurrentQuestions(geoQuestions);
        break;
      case 'marvel':
        setCurrentQuestions(marvelQuestions);
        break;
      case 'math':
        setCurrentQuestions(mathQuestions);
        break;
      case 'sports':
        setCurrentQuestions(sportsQuestions);
        break;
      default:
        setCurrentQuestions([]);
        break;
    }
  }, [category]);

  const answers = (answer) => {
    setselected(answer);
    setisdisabled(false);
  };

  const handleNextClick = (e) => {
    setisdisabled(true);
    e.preventDefault();

    setcurrentqt(currentqt + 1);
    if (selected === currentQuestions[currentqt].correct) {
      setscore(score + 1);
    }
  };

  if (currentqt === 10) {
    navigate(`/score/${score}/${name}`, {
      state: { score: score, name: name },
    });
  }

  const handleReset = () => {
    setcurrentqt(0);
    setscore(0);
    setisdisabled(true);
    setselected(undefined);
    navigate('/');
  };

  return (
    <>
      <div className='relative flex gap-7 justify-center p-2 bg-gray-200'>
        <p>
          Hello <span style={{ textDecoration: 'underline' }}>{name}</span>
        </p>
        <p>
          Your Quiz category is{' '}
          <span
            style={{
              backgroundColor: '#00b4d8',
              color: 'white',
              padding: '0.2rem 0.5rem',
            }}
          >
            {category}
          </span>
        </p>
      </div>
      <div className='relative'>
        <h2 className='bg-gray-200 '>Quiz 10 questions</h2>
        <Time />
        <h3 className='bg-green-500 w-24 rounded-xl text-2xl p-5 absolute top-[62px]'>
          {currentqt + 1}/10
        </h3>
        {currentqt < 10 ? (
          <div>
            <form>
              <Quiz
                handleCallback={answers}
                key={currentqt}
                Question={currentQuestions[currentqt]}
                questionId={0}
                question={''}
                answers={[]}
                correct={''}
                isanswered={undefined}
                handlesetScore={undefined}
                category={''}
                name={''}
              />
              <div className='absolute right-0 top-10'>
                <button
                  className='bg-red-500 text-white px-4 py-2 rounded-md mt-4'
                  onClick={handleReset}
                >
                  Reset Quiz
                </button>
              </div>
              <div className='flex justify-end '>
                <button
                  disabled={isdisabled}
                  type='submit'
                  name={category}
                  className='bg-green-500 text-white px-8 py-2 rounded-md hover:scale-110 mt-[-27px] disabled:bg-gray-400'
                  onClick={handleNextClick}
                >
                  <img src={nextbutton} className='w-8' alt='next-button' />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div></div>
    </>
  );
};

export default Quizs;
