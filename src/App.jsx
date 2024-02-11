import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Score from './components/quiz/Score';
import Quiz from './components/quiz/Quizs';
import './App.css';

function App() {
  return (
    <>
      <div>
        <h1 className='text-3xl text-center font-bold underline pt-5 mb-10'>
          CuriousIQ
        </h1>

        <BrowserRouter>
          <Routes>
            <Route path='/quiz/:category/:name' element={<Quiz />} />
            <Route path='/' element={<Home />} />
            <Route path='/score/:score/:name' element={<Score />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
