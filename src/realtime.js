import './stylesheets/index.scss';
import * as firebase from 'firebase';
import 'firebase/database';
import 'chart.js';
import 'chartjs-plugin-annotation';
import * as moment from'moment'
import chartsetting from './chartsetting'

firebase.initializeApp({
  apiKey: 'AIzaSyD4mGvlBEK1Q-JK5Htib1y319xNq5k88_4',
  authDomain: "portco2.firebaseapp.com",
  databaseURL: "https://portco2.firebaseio.com/",
  projectId: "portco2",
  storageBucket: "portco2.appspot.com"
});

const chart = chartsetting('P社内CO2濃度(30秒毎更新)', [], []);
const db =  firebase.database();
const co2ref = db.ref('co2');

co2ref.on('child_changed', function(data) {
  if(data.key == 'value') {
    chart.data.labels.push(moment().format('h:mm:ss a'));
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data.val());
    });
    chart.update();
  }
});

