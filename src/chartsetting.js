export default function(title, labels, data) {
  const ctx = document.getElementById('chart').getContext('2d');
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'CO2',
          borderColor: 'rgb(255, 0, 0)',
          data: data
        }
      ]
    },
    options: {
      title: {
        display: !!title,
        fontSize: 20,
        text: title
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              min: 350,
              max: 1600
            }
          }
        ]
      },
      annotation: {
        annotations: [
          {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: 1400,
            borderColor: 'red',
            position: 'left',
            borderWidth: 4,
            label: {
              position: 'left',
              enabled: true,
              content: '思考力1/2になるライン'
            }
          },
          {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: 1000,
            borderColor: 'yellow',
            position: 'left',
            borderWidth: 4,
            label: {
              position: 'left',
              enabled: true,
              content: '超えてはいけないライン'
            }
          },
          {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: 400,
            borderColor: 'blue',
            position: 'left',
            borderWidth: 4,
            label: {
              position: 'left',
              enabled: true,
              content: '外気並み'
            }
          }
        ]
      },
      elements: {
        line: {
          tension: 0
        }
      }
    }
  });
};
