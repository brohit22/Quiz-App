import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Score = () => {
  const { score, name, info } = useParams();
  const scoreNumber = Number(score);
  const navigate = useNavigate();

  return (
    <div className='mt-36'>
      <h2>{info}</h2>
      {scoreNumber >= 8 ? (
        <>
          <div className='celebration'>
            <h1>Congratulations!</h1>
            <p>You got a great score!</p>
          </div>
          <div className='bg-green-400 text-white p-5'>
            <h1 className='text-2xl font-bold'>
              Congrats! {name} You scored the highest Your Score is{' '}
              <i>{score}</i> out of 10
            </h1>
            <button
              className='p-5 bg-slate-800 text-white rounded-3xl mt-5 hover:text-black hover:bg-white'
              onClick={() => {
                navigate('/');
              }}
            >
              Try again or Change Category
            </button>
          </div>
        </>
      ) : (
        <>
          {scoreNumber <= 7 && scoreNumber > 5 ? (
            <div className='text-2xl font-bold bg-yellow-400 text-white p-5'>
              <h1>
                Good job! {name} Try again You Scored <i>{score}</i> out of 10
              </h1>
            </div>
          ) : null}

          {scoreNumber <= 5 ? (
            <div className='text-2xl font-bold bg-red-400 text-white p-5'>
              <h1>
                Nice try! {name} Try again You Scored <i>{score}</i> out of 10
              </h1>
            </div>
          ) : null}

          <button
            className='p-5 bg-slate-800 text-white rounded-3xl mt-5'
            onClick={() => {
              navigate('/');
            }}
          >
            Try again
          </button>
        </>
      )}
    </div>
  );
};

export default Score;
