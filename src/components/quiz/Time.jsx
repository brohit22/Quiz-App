import React from 'react';
import Countdown from 'react-countdown';
import { useNavigate, useParams } from 'react-router-dom';

const Time = React.memo(() => {
  const { name } = useParams();
  const urlSearchParams = new URLSearchParams(window.location.search);
  let quiz = urlSearchParams.get('quiz');

  const navigate = useNavigate();

  const Completionist = () => {
    if (quiz === null) {
      quiz = '0';
    }
    const decodeScore = parseInt(atob(quiz), 10);
    setTimeout(() => {
      navigate(`/score/${decodeScore}/${name}`, {
        state: { score: decodeScore, name: name, info: 'Time is up' },
      });
    }, 1000);
    return <span>Time is up</span>;
  };

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };

  return (
    <div>
      <h2 className=' float-right '>
        Time left :
        <span className='text-green-500'>
          <Countdown date={Date.now() + 90000} renderer={renderer} />
        </span>
      </h2>
    </div>
  );
});

export default Time;
