import React, { useState } from 'react';
import { TiChevronLeftOutline, TiChevronRightOutline } from 'react-icons/ti';
import './App.css';

const CARDS = 10;
const MAX_VISIBILITY = 3;

const Card = ({ title, content }) => (
  <div className="card-carousel">
    <h2 className='carouselH2'>{title}</h2>
    <p className='carouselP'>{content}</p>
  </div>
);

const Carousel = ({ children }) => {
  const [active, setActive] = useState(2);
  const count = React.Children.count(children);

  const handlePrevClick = () => {
    setActive((prevActive) => prevActive - 1);
  };

  const handleNextClick = () => {
    setActive((prevActive) => prevActive + 1);
  };

  return (
    <div className="carousel">
      {active > 0 && (
        <button className="nav left" onClick={handlePrevClick}>
          <TiChevronLeftOutline />
        </button>
      )}
      {React.Children.map(children, (child, i) => (
        <div
          className="card-container"
          style={{
            '--active': i === active ? 1 : 0,
            '--offset': (active - i) / 3,
            '--direction': Math.sign(active - i),
            '--abs-offset': Math.abs(active - i) / 3,
            pointerEvents: active === i ? 'auto' : 'none',
            opacity: Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
            display: Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block',
          }}
        >
          {child}
        </div>
      ))}
      {active < count - 1 && (
        <button className="nav right" onClick={handleNextClick}>
          <TiChevronRightOutline />
        </button>
      )}
    </div>
  );
};

const App = () => (
  <div className="app">
    <Carousel>
      {[...Array(CARDS)].map((_, i) => (
        <Card
          key={i}
          title={'Card ' + (i + 1)}
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        />
      ))}
    </Carousel>
  </div>
);

export default App;
