'use client';

import { useState } from 'react';
import styles from './chatbot.module.scss';
import { ChatbotResponse } from './chatbot-response';

export function Chatbot() {

  const [isResponseShown, setIsResponseShown] = useState<boolean>(false);

  if (isResponseShown) {
    return <div className={styles['chatbot-container']}>
      <ChatbotResponse></ChatbotResponse>
    </div>;
  }

  return (
    <div className={styles['chatbot-container']}>
      <div className={styles['chatbot-header']}>
        <h1>Trade with TransientAI</h1>
        <p>Start a new chat or make edits to an existing workflow below</p>
      </div>

      <div className={styles['search-bar']} >
        <input type="text" placeholder="Ask TransientAI anything - use '@' to find files, folders and other trading data" />
      </div>

      <div className={styles['workflow-list']}>
        <h2>Past chats & workflows</h2>
        <div className={styles['workflow-item']} onClick={() => setIsResponseShown(true)}>
          <p>Recommended bond sales, Monday 12/19/24</p>
          <span>2 days</span>
        </div>
        <div className={styles['workflow-item']}>
          <p>BlackRock portfolio analysis & recommendations</p>
          <span>3 days</span>
        </div>
        <div className={styles['workflow-item']}>
          <p>S&P 500 sector rotation strategy</p>
          <span>4 days</span>
        </div>
        <button className='hyperlink primary'>Show more</button>
      </div>
    </div>
  );
}