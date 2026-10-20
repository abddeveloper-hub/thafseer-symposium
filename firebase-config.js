/**
 * Tafsir Symposium 2026 - Firebase Realtime Database Integration
 * Department of Quranic Exegesis, Ma'din Academy & SABCeR
 */

const firebaseConfig = {
  apiKey: "AIzaSyAzG6SSCrl-BqxloWp8lILDO2h1XwKyNMM",
  authDomain: "thafseer-symposium.firebaseapp.com",
  databaseURL: "https://thafseer-symposium-default-rtdb.firebaseio.com",
  projectId: "thafseer-symposium",
  storageBucket: "thafseer-symposium.firebasestorage.app",
  messagingSenderId: "865183459878",
  appId: "1:865183459878:web:a2b4fde81bacb6f043d4e7",
  measurementId: "G-E2S74QFNX4"
};

const FirebaseSync = {
  app: null,
  db: null,
  analytics: null,
  isConnected: false,

  init: function() {
    if (typeof firebase === 'undefined') {
      console.warn("Firebase SDK not loaded. App operating in offline LocalStorage mode.");
      return false;
    }

    try {
      if (!firebase.apps.length) {
        this.app = firebase.initializeApp(firebaseConfig);
      } else {
        this.app = firebase.app();
      }

      if (firebase.database) {
        this.db = firebase.database();
      }

      if (firebase.analytics) {
        this.analytics = firebase.analytics();
      }

      this.isConnected = true;
      console.log("Firebase Realtime Database initialized successfully.");
      return true;
    } catch (err) {
      console.error("Firebase initialization error:", err);
      this.isConnected = false;
      return false;
    }
  },

  seedInitialData: function(key, initialData) {
    if (!this.isConnected || !this.db) return Promise.resolve(initialData);

    const ref = this.db.ref(key);
    return ref.once('value').then(snapshot => {
      const val = snapshot.val();
      const strVal = JSON.stringify(val);
      if (val === null || val === undefined || (Array.isArray(val) && val.length === 0 && initialData.length > 0) || strVal.includes("session-1") || strVal.includes("spk-1") || strVal.includes("gal-1") || strVal.includes("reg-101")) {
        return ref.set(initialData).then(() => {
          console.log(`Firebase: Seeded initial data for node '${key}'`);
          return initialData;
        });
      } else {
        return Array.isArray(val) ? val : Object.values(val);
      }
    }).catch(err => {
      console.warn(`Firebase seed error for '${key}':`, err);
      return initialData;
    });
  },

  syncNode: function(key, onDataReceived) {
    if (!this.isConnected || !this.db) return;

    const ref = this.db.ref(key);
    ref.on('value', (snapshot) => {
      const val = snapshot.val();
      if (val !== null && val !== undefined) {
        const dataArray = Array.isArray(val) ? val : Object.values(val);
        onDataReceived(dataArray);
      }
    }, (error) => {
      console.error(`Firebase Realtime Database sync error for node '${key}':`, error);
    });
  },

  saveData: function(key, data) {
    if (!this.isConnected || !this.db) {
      console.warn(`Firebase not connected. Save for '${key}' stored locally.`);
      return Promise.resolve(false);
    }

    return this.db.ref(key).set(data).then(() => {
      console.log(`Firebase: Updated node '${key}'`);
      return true;
    }).catch(err => {
      console.error(`Firebase error writing to '${key}':`, err);
      return false;
    });
  }
};

// Auto-initialize on script load
FirebaseSync.init();
