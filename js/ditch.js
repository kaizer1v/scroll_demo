const circle = d3.select('svg circle')
const km_counter = d3.select('#counter')
 /**
 * Select all `sections` and get their top position coordinate
 * Create an array of functions corresponding to each section
 * Monitor the scroll event to know which section user has scrolled to
 * Based on position index, trigger corresponding function for that section
 **/

const eventActivate = new Event('activate')
const eventProgress = new Event('progress')

// const activateListnerer = (e) => { console.log(e.target.innerHTML, 'activate triggered') }
const progressListnerer = (e) => { console.log(e.target.innerHTML, 'progress triggered') }

// do all kinds of manipulations to html at every corresponding section...
const zeroth = () => {
  console.log('zeroth activated')
  circle.transition()
    .attr('cx', 70)
    .attr('cy', 70)
    .attr('fill', 'red')
}

const first  = () => {
  // console.log('first activated')
  circle.transition()
    .attr('cx', 400)
    .attr('cy', 200)
    .attr('fill', 'red')
  // circle.transition()
}

const second = () => {
  // console.log('second activated')
  circle.transition('move-fills').duration(300)
    .attr('fill', 'blue')
    .attr('cx', 450)
    .attr('cy', 350)

  km_counter.transition().text(10)
}

const three  = () => { console.log('three activated') }
const fourth = () => { console.log('fourth activated') }
const five   = () => { console.log('five activated') }
const six    = () => {
  console.log('six activated')
  circle.transition()
    .attr('cx', 250)
    .attr('cy', 500)
    .attr('fill', 'purple')
  km_counter.transition().text(30)
}

const seven  = () => { console.log('seventh heaven activated') }
const eight  = () => { console.log('eight activated') }

const events = []
      events[0] = zeroth
      events[1] = first
      events[2] = second
      events[3] = three
      events[4] = fourth
      events[5] = five
      events[6] = six
      events[7] = seven
      events[8] = eight

let currentIndex = -1
const sections = Array.prototype.slice.call(document.getElementsByClassName('step')),
      sectionPositions = []

sections.forEach((e, i) => {
  let top = e.getBoundingClientRect().top
  if(i === 0) { startPos = top }

  // maintain position tops relative to the first section
  sectionPositions.push(top - startPos)

  // attach event listener to each section
  sections[i].addEventListener('activate', events[i], false)
  sections[i].addEventListener('progress', progressListnerer, false)
})

document.addEventListener('scroll', (e) => {
  let currPos = window.pageYOffset - (document.body.getBoundingClientRect().top + window.pageYOffset)
  let sectionIndex = d3.bisect(sectionPositions, currPos)

  sectionIndex = Math.min(sections.length - 1, sectionIndex)

  if(currentIndex !== sectionIndex) {
    sections[sectionIndex].dispatchEvent(eventActivate)

    currentIndex = sectionIndex

    events[sectionIndex]()
  }

  let prevIndex = Math.max(sectionIndex - 1, 0)
  let prevTop = sectionPositions[prevIndex]
  let progress = (currPos - prevTop) / (sectionPositions[sectionIndex] - prevTop)
  sections[sectionIndex].dispatchEvent(eventProgress)

})