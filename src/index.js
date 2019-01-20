import './stylesheets/index.scss';
import 'firebase/firestore';
import 'chart.js';

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
              min: 0,
              max: 2000
            }
          }
        ]
      }
    }
  });
};

let db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
let data = [];
let labels = [];

let day = new Date();
day.setDate(day.getDate() - 10);

db.settings(settings);
db.collection('CO2')
  .where('timestamp', '>=', firebase.firestore.Timestamp.fromDate(day))
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
    console.log(labels);
    console.log(data);
    loadCharts(labels, data);
  });
