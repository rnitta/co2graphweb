import './stylesheets/index.scss';
import 'firebase/firestore';
import 'chart.js';
import 'chartjs-plugin-annotation';

import * as firebase from 'firebase';
firebase.initializeApp({
  apiKey: 'AIzaSyD4mGvlBEK1Q-JK5Htib1y319xNq5k88_4',
  authDomain: 'portco2.firebaseapp.com',
  projectId: 'portco2'
});

const loadCharts = function(labels, data) {
  const ctx = document.getElementById('hoge').getContext('2d');
  new Chart(ctx, {
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
      responsive: true,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              min: Math.round(Math.min(...data) * 0.9),
              max: Math.round(Math.max(...data) * 1.1)
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

let db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
let data = [];
let labels = [];

let day = new Date();
day.setDate(day.getDate() - 2);
db.settings(settings);
db.collection('CO2')
  .where('timestamp', '>=', firebase.firestore.Timestamp.fromDate(day))
  .limit(1200)
  .orderBy('timestamp')
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(doc => {
      const item = [
        doc
          .data()
          ['timestamp'].toDate()
          .toLocaleString(),
        doc.data()['value']
      ];
      labels.push(item[0]);
      data.push(item[1]);
    });
    loadCharts(labels, data);
    document.getElementById('loader').remove();
  })
  .catch(function(error) {
    alert('エラー。詳細はインスペクタに')
    console.log('Quota exceededなら今日はもう閉店ガラガラ。明日みてね！');
    console.log(error);
  });
