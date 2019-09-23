import React from 'react';
import './app.css';
import Grid from '../grid'

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Conway&apos;s Game of Life</h1>
      </header>
      <Grid />
      <section className="App-rules">
        <h2>Rules</h2>
        <ol>
          <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
          <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
          <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
          <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
        </ol>
      </section>
    </div>
  );
};

export default App;
