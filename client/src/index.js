import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthContextProvider from './contexts/AuthContext';
import DashboardContextProvider from './contexts/DashboardContext';
import SchedulerContextProvider from './contexts/SchedulerContext';

ReactDOM.render(
  <React.StrictMode>
    <SchedulerContextProvider>
      <DashboardContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </DashboardContextProvider>
    </SchedulerContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
