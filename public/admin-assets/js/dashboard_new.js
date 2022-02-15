window.onload = function() {
  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];

  const data = {
    labels: labels,
    datasets: [
        {
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 255)',
      borderColor: 'rgb(255, 99, 234)',
      data: [0, 10, 5, 2, 20, 30],
      yAxisID: 'y',
    },
    {
        label: 'My First dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 15, 45, 27, 23, 31],
        yAxisID: 'y1',
      },
]
  };



  const DATA_COUNT = 7;
const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};


  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      stacked: false,
      plugins: {
        title: {
          display: true,
          text: 'Chart.js Line Chart - Multi Axis'
        }
      },scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
  
          // grid line settings
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
      }
    },
  };

  const myChart = new Chart(
    document.getElementById('myChart').getContext('2d'),
    config
  );
}
