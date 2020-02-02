import React from 'react';
import ReactDOM from 'react-dom';
import useDarkMode from './use-dark-mode';
import Toggle from './Toggle';
import Content from './Content';
import './styles.scss';

function App() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <div>
      <div className="navbar">
        <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
      <Content />
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
