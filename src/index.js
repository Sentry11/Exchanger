import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App 
    currencies={[
      { name: 'RUB', rate: 1 },
      { name: 'USD', rate: 0.013433637829124127 },
      { name: 'EUR', rate: 0.011065619121389841 },
    ]}/>
  </React.StrictMode>
);

