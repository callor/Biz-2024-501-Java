import config from '@config';
import * as admin from 'firebase-admin';

const firebaseInit = () => {
  admin.initializeApp({
    credential: admin.credential.cert(config.firebase.account),
  });
};

export default firebaseInit;
