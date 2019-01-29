import './stylesheets/index.scss';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'chart.js';
import 'chartjs-plugin-annotation';
import chartsetting from './chartsetting'

firebase.initializeApp({
  apiKey: 'AIzaSyD4mGvlBEK1Q-JK5Htib1y319xNq5k88_4',
  authDomain: 'portco2.firebaseapp.com',
  projectId: 'portco2'
});

let db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
let data = [];
let labels = [];

let day = new Date();
day.setDate(day.getDate() - 2);
db.settings(settings);
db.collection('CO2')
  .where('timestamp', '>=', firebase.firestore.Timestamp.fromDate(day))
  .orderBy('timestamp', 'desc')
  .limit(process.env.NODE_ENV === 'development' ? 10 : 1200)
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
    chartsetting('過去2日P社内CO2濃度', labels.reverse(), data.reverse());
    document.getElementById('loader').remove();
  })
  .catch(function(error) {
    if(error.code === 'resource-exhausted') {
      alert('無料枠を食い切ったのでまた明日。（17時区切り）')
      console.log('今日はもう閉店ガラガラ。明日みてね！');
    }
    console.log(error);
  });
