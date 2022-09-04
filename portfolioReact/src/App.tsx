import React, { useState, useEffect } from 'react';
import Education from './components/Education';
import Experience from './components/Experience';
import Navigation from './components/Navigation';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certificates from './components/Certificates';
import Languages from './components/Languages';
import Interests from './components/Interests';
import Resume from './components/Resume';
import Fun from './components/Fun';
import Contact from './components/Contact';
import PdfExporter from './components/PdfExporter';
import './styles/main.css';
import './styles/timeline.css';

function PortfolioListView() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setItems] = useState(null);

  useEffect(() => {
    fetch('https://portfolio.tesj.dk/api/portfolio/getall/en')
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return (
      <div className="not-loaded">
        <span>Error: {error.message}</span>
      </div>
    );
  } else if (!isLoaded) {
    return (
      <div className="not-loaded">
        <span>Fetching data...</span>
      </div>
    );
  } else {
    return (
      <div>
        <Navigation></Navigation>
        <div className="container-fluid p-0">
          <PdfExporter data={data}></PdfExporter>
          <Resume></Resume>
          <Experience data={data}></Experience>
          <Education data={data}></Education>
          <Certificates data={data}></Certificates>
          <Projects data={data}></Projects>
          <Skills data={data}></Skills>
          <Languages data={data}></Languages>
          <Interests data={data}></Interests>
          <Fun></Fun>
          <Contact></Contact>
        </div>
      </div>
    );
  }
}

class PortfolioList extends React.Component {
  render() {
    return <PortfolioListView />;
  }
}

export default PortfolioList;
