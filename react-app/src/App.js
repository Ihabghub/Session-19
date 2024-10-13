import { useState } from 'react';
import './App.css';
import image from './france2.jpeg';
import image1 from './mars.jpeg';
import image2 from './pacific.jpeg'

function App() {
    const [username, setUsername] = useState(""); // State for username
    const [isQuizStarted, setIsQuizStarted] = useState(false); // State to manage quiz start

    const data = [
        {
            question: "What is the capital of France?",
            option1: "Beirut",
            option2: "Paris",
            option3: "Berlin",
            option4: "Madrid",
            ans: "Paris",
            image: image
        },
        {
            question: "Which planet is known as the Red Planet?",
            option1: "Jupiter",
            option2: "Mars",
            option3: "Earth",
            option4: "Venus",
            ans: "Mars",
            image: image1
        },
        {
            question: "What is the largest ocean on Earth?",
            option1: "Pacific",
            option2: "Atlantic",
            option3: "Indian",
            option4: "Arctic",
            ans: "Pacific",
            image: image2
        }
    ];

    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(data[index]);

    function swipeRight() {
        if (index < data.length - 1) {
            setIndex(prevIndex => {
                const newIndex = prevIndex + 1;
                setQuestion(data[newIndex]);
                return newIndex;
            });
        } else {
            // alert('End of the game');
        }
    }

    function swipeLeft() {
        if (index > 0) {
            setIndex(prevIndex => {
                const newIndex = prevIndex - 1;
                setQuestion(data[newIndex]);
                if (newIndex === -1) {
                    setQuestion(data[0]);
                    alert("Here's the first question");
                }
                return newIndex;
            });
        }
    }

    const handleAnswer = (event) => {
        const text = event.target.innerText;
        if (text === question.ans) {
            event.target.style.backgroundColor = 'green';
            setTimeout(() => {
                event.target.style.backgroundColor = 'white';
                swipeRight();
            }, 1000);
        } else {
            event.target.style.backgroundColor = 'red';
            setTimeout(() => {
                event.target.style.backgroundColor = 'white';
                swipeRight();
            }, 1500);
        }
    }

    const startQuiz = () => {
        if (username.trim()) {
            setIsQuizStarted(true);
        } else {
            alert("Please enter a username");
        }
    }

    return (
        <div className="Quiz">
            {!isQuizStarted ? (
                <div className='username-input'>
                    <h2>Enter your username:</h2>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="Username"
                    />
                    <button onClick={startQuiz}>Start Quiz</button>
                </div>
            ) : (
                <>
                    <div className='top'>
                        <div className='icon' onClick={swipeLeft}>&lt;</div>
                        <div className='image'><img src={question.image} alt="flag" /></div>
                        <div className='icon' onClick={swipeRight}>&gt;</div>
                    </div>
                    <div className='middle'>
                        <h4>{question.question}</h4>
                    </div>
                    <div className='bottom'>
                        <div className='answer' onClick={handleAnswer}>{question.option1}</div>
                        <div className='answer' onClick={handleAnswer}>{question.option2}</div>
                        <div className='answer' onClick={handleAnswer}>{question.option3}</div>
                        <div className='answer' onClick={handleAnswer}>{question.option4}</div>
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
