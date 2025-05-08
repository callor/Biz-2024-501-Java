import config from '@config';
import admin from 'firebase-admin';

const firebaseInit = () => {
  admin.initializeApp({
    credential: admin.credential.cert(config.firebase.account),
  });
  // admin.messaging().send({ notification: { title: 'TEST', body: 'TEST' }, data: {}, topic: 'ABC' });
};

export default firebaseInit;
