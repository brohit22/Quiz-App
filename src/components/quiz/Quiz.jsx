import React, { useState } from 'react';

const Quiz = (props) => {
  const { Question } = props;
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  if (
    !Question ||
    !Question.question ||
    !Question.answers ||
    !Question.correct
  ) {
    return (
      <div className='border flex flex-col p-7 shadow-xl bg-gray-200 mt-20'>
        <p className='text-red-500'>Error: Invalid question data</p>
      </div>
    );
  }

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    props.handleCallback(answer);
  };

  return (
    <div className='border flex flex-col p-7 shadow-xl bg-black mt-20'>
      <div className='flex'>
        <p className='text-2xl text-white'>{Question.question}</p>
      </div>
      <div className='flex flex-col items-start gap-4 text-xl p-20'>
        {Question.answers.map((answer, i) => (
          <ul className='flex' key={i}>
            <li
              className={`flex border ${
                selectedAnswer === answer ? 'bg-blue-500' : 'bg-gray-300'
              } answered w-[100%] items-center p-3 rounded-xl`}
              onClick={() => handleAnswer(answer)}
            >
              {answer}
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
