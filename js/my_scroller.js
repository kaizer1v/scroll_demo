// lock and load everything before rendering

(function() {
  const svg_width = 1000,
        svg_height = 1000,
        svg = d3.select('#vis').append('svg')

  svg.attr('width', svg_width)
    .attr('height', svg_height)
    .attr('opacity', 1)

  svg.append('circle')
    .attr('cx', 30)
    .attr('cy', 30)
    .attr('r', 20)

  // section 01

  // section 02
  const sec02 = svg.append('g').attr('class', 'sec02')
  sec02.append('text')
    .attr('class', 'title')
    .attr('x', svg_width / 2)
    .attr('y', svg_height / 2 - 30)
    .text('Total Distance')

  sec02.append('text')
    .attr('class', 'sub-title')
    .attr('x', svg_width / 2)
    .attr('y', svg_height / 2 + 30)
    .text('4877 Km - that\'s like Bangalore to Delhi and back')

  sec02.attr('opacity', 0)


  // section 03
  const sec03 = svg.append('g').attr('class', 'sec03')
  sec03.append('text')
    .attr('class', 'title')
    .attr('x', svg_width / 2)
    .attr('y', svg_height / 2 - 30)
    .text('Total Spending')

  sec03.append('text')
    .attr('class', 'sub-title')
    .attr('x', svg_width / 2)
    .attr('y', svg_height / 2 + 30)
    .text('total spendings: INR 93760.8 (almost a lakh)')
  sec03.attr('opacity', 0)



// ---- sectional functions

  const fn1 = () => {

    svg.select('circle')
      .transition()
      .attr('cx', 30)
      .attr('cy', 30)
      .attr('r', 20)

  }

  const fn2 = () => {
    // hide section 01 & 03
    sec03.transition().duration(800).attr('opacity', 0)

    svg.select('circle')
      .transition()
      .attr('cx', 80)
      .attr('cy', 80)
      .attr('r', 30)

    const total_distance = 4877
    const total_spendings = 93760.8

    sec02.transition().duration(800).attr('opacity', 1)
  }


  const fn3 = () => {
    sec02.transition().duration(800).attr('opacity', 0)
    sec03.transition().duration(800).attr('opacity', 1)

    d3.select('svg circle').transition().attr('fill', 'red')
  }

  // -----

  let sss = scroller().container(d3.select('#graphic'))
  sss(d3.selectAll('.step'))

  const activationFunctions = [
    fn1,
    fn2,
    fn3,
    () => { d3.select('svg circle').transition().attr('cx', 120) },
    () => { d3.select('svg circle').transition().attr('cy', 120) },
    () => { d3.select('svg circle').transition().attr('r', 60) },
    () => { d3.select('svg circle').transition().attr('r', 80).attr('fill', 'purple').attr('stroke', 'pink').attr('stroke-width', 5) },
    () => { console.log('fn 8') },
    () => { console.log('fn 9') }
  ]

  let lastIndex = -1,
      activeIndex = 0;

  const activate = (index) => {
    activeIndex = index
    let sign = (activeIndex - lastIndex) < 0 ? -1 : 1
    let scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign)
    scrolledSections.forEach((i) => { activationFunctions[i]() })
    lastIndex = activeIndex
  }

  // setup event handling
  sss.on('active', function (index) {
    // highlight current step text
    d3.selectAll('.step')
      .style('opacity', function (d, i) { return i === index ? 1 : 0.1; })

    // activate current section
    activate(index)    // plot is an object that updates a chart based on it's index
  })

  sss.on('progress', (index, progress) => {
    // do what you want to within each section index's progress
    console.log(index, progress)
  })

}())