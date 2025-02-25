"use client";

import React, { useEffect, useState } from 'react';
import './QuizPage.css';

interface Question {
  text: string;
  wordByWordMeaning: { [key: string]: string };
  overallMeaning: string;
}

interface Quiz {
  id: string;
  name: string;
  questions: Question[];
}

const QuizPage: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const quizFiles = ['/Quiz1.json', '/Quiz2.json', '/Quiz3.json'];
        const fetchedQuizzes: Quiz[] = await Promise.all(
          quizFiles.map(async (file) => {
            const response = await fetch(file);
            if (!response.ok) {
              throw new Error(`Failed to load ${file}`);
            }
            return response.json();
          })
        );
        setQuizzes(fetchedQuizzes);
      } catch (err) {
        setError('Failed to fetch quizzes.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleQuizClick = (quizId: string) => {
    setSelectedQuiz(quizId);
    setCurrentQuestionIndex(0);
    setIsSidebarOpen(false);
  };

  const handleQuestionClick = (index: number) => {
    setCurrentQuestionIndex(index);
    setIsSidebarOpen(false); // Close the sidebar after clicking on a question
  };

  const goToNextQuestion = () => {
    if (selectedQuiz) {
      const currentQuiz = quizzes.find(q => q.id === selectedQuiz);
      if (currentQuiz) {
        setCurrentQuestionIndex(prev => Math.min(prev + 1, currentQuiz.questions.length - 1));
      }
    }
  };

  const goToPreviousQuestion = () => {
    if (selectedQuiz) {
      setCurrentQuestionIndex(prev => Math.max(prev - 1, 0));
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const currentQuiz = quizzes.find(q => q.id === selectedQuiz);

  if (loading) {
    return <div>Loading quizzes...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="quiz-container">
      <h1>Slokas with meaning</h1>
      <div className="quiz-list">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="quiz-box" onClick={() => handleQuizClick(quiz.id)}>
            {quiz.name}
          </div>
        ))}
      </div>

      {selectedQuiz && currentQuiz && (
        <div className="quiz-content">
          <div className="quiz-header">
            <h2>{currentQuiz.name}</h2>
            <button onClick={toggleSidebar} className="toggle-sidebar-button">
              {isSidebarOpen ? 'Hide Slokas(Guhya Ślokāḥ)' : 'Show all Slokas(Sarve Ślokāḥ Darśaya)'}
            </button>
          </div>

          {isSidebarOpen && (
            <div className="questions-container">
              <h3>Questions</h3>
              {currentQuiz.questions.map((_, index) => (
                <div
                  key={index}
                  onClick={() => handleQuestionClick(index)}
                  className="question-number"
                >
                  {`Sloka${index + 1}`} {/* Changed numbering format */}
                </div>
              ))}
            </div>
          )}

          <div className="question">
            {currentQuiz ? (
              currentQuiz.questions[currentQuestionIndex] ? (
                <>
                  <h3>{`Sloka${currentQuestionIndex + 1}:`}<br />
                    <strong>{`"${currentQuiz.questions[currentQuestionIndex].text || "No sloka available"}"`}</strong>
                  </h3>
                  {currentQuiz.questions[currentQuestionIndex].wordByWordMeaning ? (
                    <div className="meaning">
                      <h4>Word-by-Word Meaning:</h4>
                      <ul>
                        {Object.entries(currentQuiz.questions[currentQuestionIndex].wordByWordMeaning).map(([word, meaning]) => (
                          <li key={word}>
                            <strong>{word}:</strong> {meaning}
                          </li>
                        ))}
                      </ul>
                      <h4>Overall Meaning:</h4>
                      <p>{currentQuiz.questions[currentQuestionIndex].overallMeaning || "No overall meaning available"}</p>
                    </div>
                  ) : (
                    <p>No word-by-word meaning available</p>
                  )}
                </>
              ) : (
                <p>No sloka available for the selected question.</p>
              )
            ) : (
              <p>No quiz selected.</p>
            )}
          </div>

          <div className="navigation">
            <button
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="nav-button"
            >
              Previous(Pūrvam)
            </button>
            <button
              onClick={goToNextQuestion}
              disabled={currentQuestionIndex === currentQuiz.questions.length - 1}
              className="nav-button"
            >
              Next(Agram)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
