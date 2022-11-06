importScripts(
  'https://www.gstatic.com/firebasejs/9.0.1/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.1/firebase-messaging-compat.js',
);

firebase.initializeApp({
  apiKey: 'AIzaSyA-RVV-owCp5DTP8ipj-tlyQ_CaqTm5TBA',
  authDomain: 'final-project-2fabc.firebaseapp.com',
  projectId: 'final-project-2fabc',
  storageBucket: 'final-project-2fabc.appspot.com',
  messagingSenderId: '168412527890',
  appId: '1:168412527890:web:de6e1caa561f3da58187cb',
  measurementId: 'G-RS4Z0EMTFD',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  const data = payload?.data;

  const notificationTitle = data?.title;
  const notificationOptions = {
    body: data?.content,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
