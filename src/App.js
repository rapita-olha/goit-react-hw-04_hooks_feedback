import { useState } from 'react';

import Section from './components/Section/Section';
import FeedbackOptions from './components/Feedback/FeedbackOptions/FeedbackOptions';
import Statistics from './components/Feedback/Statistics/Statistics';
import Notification from './components/Notification/Notification';

import './App.scss';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const totalBtn = { good, neutral, bad };

  const leaveFeedback = ({ target: { textContent } }) => {
    const targetBtn = textContent.toLowerCase();

    switch (targetBtn) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;

      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;

      case 'bad':
        setBad(prevState => prevState + 1);
        break;

      default:
        return;
    }
  };

  const countTotalFeedback = () => {
    const totalFeedback = good + neutral + bad;

    if (!totalFeedback) {
      return 0;
    }

    return totalFeedback;
  };

  const countPositiveFeedbackPercentage = () => {
    // return Math.round((good * 100) / (good + neutral + bad));
    return Math.round((good * 100) / countTotalFeedback());
  };

  return (
    <div className="container">
      <h1 className="visually_hidden">Feedback</h1>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys(totalBtn)}
          onLeaveFeedback={leaveFeedback}
        />
      </Section>

      <Section title="Statistics">
        {countTotalFeedback() === 0 ? (
          <Notification message="No feedback given" />
        ) : (
          <Statistics
            // поднятие состояния-от родителя вниз детей кидаются пропсы
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        )}
      </Section>
    </div>
  );
}

// ---------------------------------------------------
// onClick={this.setActiveIdx(index)}-на это место будет возвращаен вызов функции-результат- те вернет undefind
// onClick={() => this.setActiveIdx(index)}-вернут ссылку на функцию с индеком
