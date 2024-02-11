import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [quiz, setQuiz] = useState(true);
  const [category, setCategory] = useState('tech');
  const [isdisabled, setisdisabled] = useState(true);
  const [nameError, setNameError] = useState('');

  const handlequiz = () => {
    if (name.trim() === '') {
      setNameError('Name is required');
    } else {
      setQuiz(false);
      navigate(`/quiz/${category}/${name}`, { state: { category, name } });
    }
  };

  useEffect(() => {
    if (name.trim()) {
      setisdisabled(false);
      setNameError('');
    } else {
      setisdisabled(true);
    }
  }, [name]);

  const handlecategory = (e) => {
    setCategory(e.target.value);
  };

  return (
    <>
      <div className='flex items-center justify-center bg-[#262626]'>
        <div></div>
        <div>
          {quiz ? (
            <div className='flex flex-col items-center my-36 justify-center gap-8'>
              <div className='flex gap-5'>
                <input
                  className='w-72 border p-5'
                  type='text'
                  placeholder='Enter your name'
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError('');
                  }}
                  onFocus={() => setNameError('')}
                />
                <select
                  title='Select Category'
                  className='w-28 text-center h-14 bg-green-300 rounded-lg'
                  onChange={handlecategory}
                >
                  <option value='tech'>Technology</option>
                  <option value='geo'>Geography</option>
                  <option value='marvel'>Marvel</option>
                  <option value='math'>Math</option>
                  <option value='sports'>Sports</option>
                </select>
              </div>
              <small className='text-white'>
                Note: You will have 10 multiple-choice questions to finish in 4
                minutes!
              </small>
              {nameError && <p className='text-red-500'>{nameError}</p>}
              <button
                disabled={isdisabled}
                className='text-white bg-green-500 p-3 rounded-xl w-[30%] disabled:bg-gray-600'
                onClick={handlequiz}
              >
                Take Quiz
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
