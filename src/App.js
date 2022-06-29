import { useState, useEffect } from 'react'
import { bisect } from 'd3'
// import logo from './logo.svg';
import './App.css';

const sectionsData = [
  {
    'title': "OpenVis Conf 2013",
    'content': 'this is another section'
  }, {
    'title': "Filler Words",
    'content': 'this is another section'
  }, {
    'title': "My Talk",
    'content': 'this is another section'
  }, {
    'title': "My Stumbles",
    'content': 'this is another section'
  }, {
    'title': "Um's, Ah's &amp; Uh's",
    'content': 'this is another section'
  }, {
    'title': "Fillers Over Time",
    'content': 'this is another section'
  }, {
    'title': "Ramping Back Up",
    'content': 'this is another section'
  }, {
    'title': "The Cough Effect",
    'content': 'this is another section'
  }, {
    'title': "Best of Luck to Me in 2015",
    'content': 'this is another section'
  },
]

function App() {
  const [positions, setPositions] = useState([])
  const [currPos, setPos]   = useState(window.pageYOffset)
  const [currSect, setCurrSect] = useState(0)
  // let sectionPositions = []

  // trigger `setPos` whenever user scrolls on the page
  window.addEventListener('scroll', () => setPos(window.pageYOffset), { passive: true })

  // run this only the first time after page is rendered (calculate section positions)
  useEffect(() => {
    const sections = Array.prototype.slice.call(document.getElementsByClassName('step'))
    sections.forEach((e, i) => {
      let top = e.getBoundingClientRect().top,
          startPos = 0
      if(i === 0) { startPos = top }
      positions.push(top - startPos)  // maintain position tops relative to the first section
    })
    setPositions(positions)
  }, [])

  // run this whenever scroll position changes
  useEffect(() => {
    const sectionIndex = bisect(positions, currPos)
    setCurrSect(Math.min(positions.length - 1, sectionIndex))
    // console.log('curr scroll position', currPos)
  }, [currPos])


  // run this whenever section changes
  useEffect(() => {
    console.log('currently selected section', currSect)
  }, [currSect])


  return (
    <div className="container">
      <div id="graphic">
        <div id="sections">
          { sectionsData.map((d, i) => (
            <section className="step" key={i}>
              <div className="title">{ d['title'] }</div>
              { d['content'] }
            </section>
          )) }
        </div>

        <svg id="vis">
          <circle r="50" fill="red" cx="70" cy="70"></circle>
        </svg>
        <div id="extra-space"></div>
      </div>
    </div>
  );
}

export default App;
