/**
 * Tafsir Symposium 2026 - Firebase Realtime Database & Storage Integration
 * Department of Tafsīr and Quranic Studies, Ma'din Academy & SABCeR
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
  storage: null,
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

      if (firebase.storage) {
        this.storage = firebase.storage();
      }

      if (firebase.analytics) {
        this.analytics = firebase.analytics();
      }

      this.isConnected = true;
      console.log("Firebase Realtime Database & Storage initialized successfully.");
      return true;
    } catch (err) {
      console.error("Firebase initialization error:", err);
      this.isConnected = false;
      return false;
    }
  },

  compressImage: function(file, maxDimension = 500, quality = 0.75) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        };
        img.onerror = () => resolve(e.target.result);
        img.src = e.target.result;
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  },

  uploadImage: function(folder, file) {
    return this.compressImage(file, 500, 0.75).then((compressedDataUrl) => {
      if (!compressedDataUrl) return Promise.reject("Failed to process image.");

      if (this.isConnected && this.storage) {
        const cleanName = (file.name || 'photo.jpg').replace(/[^a-zA-Z0-9.-]/g, '_');
        const fileName = `${folder}/${Date.now()}_${cleanName}`;
        const storageRef = this.storage.ref().child(fileName);

        return storageRef.putString(compressedDataUrl, 'data_url').then((snapshot) => {
          return snapshot.ref.getDownloadURL().then((url) => {
            console.log(`Firebase Storage: Uploaded image to '${fileName}' -> ${url}`);
            return url;
          });
        }).catch((err) => {
          console.warn("Firebase Storage upload fallback to compressed data URL:", err);
          return compressedDataUrl;
        });
      } else {
        return Promise.resolve(compressedDataUrl);
      }
    });
  },

  seedInitialData: function(key, initialData) {
    if (!this.isConnected || !this.db) return Promise.resolve(initialData);

    const ref = this.db.ref(key);
    return ref.once('value').then(snapshot => {
      const val = snapshot.val();
      if (val === null || val === undefined || (Array.isArray(val) && val.length === 0) || (typeof val === 'object' && Object.keys(val).length === 0)) {
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
      console.log(`Firebase: Updated node '${key}' successfully.`);
      return true;
    }).catch(err => {
      console.error(`Firebase error writing to '${key}':`, err);
      if (err && err.message && err.message.includes("PERMISSION_DENIED")) {
        console.error("CRITICAL: Firebase Rules are blocking writes! Change Realtime Database rules in Firebase Console to: { \".read\": true, \".write\": true }");
      }
      return false;
    });
  }
};

// Auto-initialize on script load
FirebaseSync.init();
