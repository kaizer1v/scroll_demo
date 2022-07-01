import { useState, useEffect } from 'react'
import { bisect, select } from 'd3'
// import logo from './logo.svg';
import './App.css';

const sectionsData = [
  {
    'title': "OpenVis Conf 2013",
    'content': 'this is another section'
  }, {
    'title': "Filler Words",
    'content': 'this is another section',
    'data': { 'r': 20, 'cx': 100 }
  }, {
    'title': "My Talk",
    'content': 'this is another section'
  }, {
    'title': "My Stumbles",
    'content': 'this is another section',
    'data': { 'r': 50, 'cx': 200 }
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


// a fn that should taken an object as a parameter containing the config of the charts
//  and renders it as a svg element.
function render(graphData) {



  if(graphData.cx)
    return (
      <circle r={graphData.r} cx={ graphData.cx }></circle>
    )
}


function App() {
  const [positions, setPositions] = useState([])
  const [currPos, setPos]   = useState(window.pageYOffset)
  const [currSect, setCurrSect] = useState(0)

  const [graphData, setGraphData] = useState({})
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
    console.log('currently selected section', sectionsData[currSect])

    // clear css from all other sections & highlight only current section
    sectionsData.map(d => d['css'] = '')
    sectionsData[currSect]['css'] = 'highlighted'

    setGraphData(sectionsData[currSect]['data'] || {})

  }, [currSect])

  return (
    <div className="container">
      <div id="graphic">
        <div id="sections">
          { sectionsData.map((d, i) => (
            <section className={`step ${ d['css'] }`} key={i}>
              <div className="title">{ d['title'] }</div>
              { d['content'] }
            </section>
          )) }
        </div>

        <svg id="vis">
          {/*{ render(graphData) }*/}
          {/*<VictoryBar
            style={{ data: { fill: "tomato", width: 25 } }}
            data={[
            { x: "cat", y: 10 },
            { x: "dog", y: 25 },
            { x: "bird", y: 40 },
            { x: "frog", y: 50 },
            { x: "fish", y: 50 }
            ]}
          />*/}
        </svg>
        <div id="extra-space"></div>
      </div>
    </div>
  );
}

export default App;