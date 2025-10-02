/* VISUALIZATION 1 */
function drawBarChart() {
    const barSvg = document.getElementById('main-svg');
    barSvg.innerHTML = ''; // clear old bars
  
    const data = [
      { activity: 'Work', hours: 17 },
      { activity: 'School', hours: 8 },
      { activity: 'Cooking', hours: 7 },
      { activity: 'Sleeping', hours: 28 }
    ];
  
    const width = barSvg.clientWidth;
    const height = barSvg.clientHeight;
  
    const barWidth = width / data.length;
    const maxHours = Math.max(...data.map(d => d.hours));
  
    const topOffset = 20;    // space at the top for labels
    const bottomOffset = 30; // space at bottom for activity labels
    const barHeightMax = height - topOffset - bottomOffset;
  
    data.forEach((d, i) => {
      const barHeight = (d.hours / maxHours) * barHeightMax;
      const yPos = height - bottomOffset - barHeight; // bar top y position
  
      // Bar
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', i * barWidth + 10);
      rect.setAttribute('y', yPos);
      rect.setAttribute('width', barWidth - 20);
      rect.setAttribute('height', barHeight);
      rect.setAttribute('fill', '#78A465');
      barSvg.appendChild(rect);
  
      // Hours label (on top of bar)
      const textHours = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textHours.setAttribute('x', i * barWidth + barWidth / 2);
      textHours.setAttribute('y', yPos - 5);
      textHours.setAttribute('text-anchor', 'middle');
      textHours.setAttribute('font-size', '14');
      textHours.setAttribute('fill', '#161616');
      textHours.textContent = d.hours;
      barSvg.appendChild(textHours);
  
      // Activity label (below bar)
      const textLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textLabel.setAttribute('x', i * barWidth + barWidth / 2);
      textLabel.setAttribute('y', height - 10);
      textLabel.setAttribute('text-anchor', 'middle');
      textLabel.setAttribute('font-size', '14');
      textLabel.setAttribute('fill', '#161616');
      textLabel.textContent = d.activity;
      barSvg.appendChild(textLabel);
    });
  }
  
  // Call once
  drawBarChart();
  // Redraw on window resize
  window.addEventListener('resize', drawBarChart);

  
/* VISUALIZATION 2 */
const bubbleSvg = document.getElementById('creative-svg');

// Example data for circles
const circlesData = [
  { cx: 50, cy: 50, r: 20, color: 'red', speed: 2 },
  { cx: 100, cy: 100, r: 30, color: 'blue', speed: 1.5 },
  { cx: 200, cy: 150, r: 25, color: 'green', speed: 3 },
  { cx: 300, cy: 80, r: 15, color: 'purple', speed: 2.5 },
];

const circles = [];

// Create circles
circlesData.forEach(d => {
  const circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
  circle.setAttribute('cx', d.cx);
  circle.setAttribute('cy', d.cy);
  circle.setAttribute('r', d.r);
  circle.setAttribute('fill', d.color);
  bubbleSvg.appendChild(circle);
  circles.push({ element: circle, ...d });
});

let animationInterval = null;

function startAnimation() {
  if (!animationInterval) {
    animationInterval = setInterval(animateCircles, 20);
  }
}

function stopAnimation() {
  if (animationInterval) {
    clearInterval(animationInterval);
    animationInterval = null;
  }
}

function animateCircles() {
  circles.forEach(c => {
    let newCX = parseFloat(c.element.getAttribute('cx')) + c.speed;
    if (newCX > bubbleSvg.clientWidth + c.r) newCX = -c.r; // wrap around
    c.element.setAttribute('cx', newCX);
  });
}
