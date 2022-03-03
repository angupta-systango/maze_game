// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBM7UQdonqXt07kFibqSYn5gCYmxMfidKs",
    authDomain: "maze-f17dd.firebaseapp.com",
    projectId: "maze-f17dd",
    databaseURL: "https://maze-f17dd-default-rtdb.firebaseio.com/",
    storageBucket: "maze-f17dd.appspot.com",
    messagingSenderId: "158683448622",
    appId: "1:158683448622:web:347352e8baa8d3529aa6bf",
    measurementId: "G-ET3YWH05Q6"
  };

    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();
    function writeUserData() {
      let userone = document.getElementById('userName').value;
      let emailid = document.getElementById('email').value;
      if(userone == ''){
        alert("Please Enter User Name");
        return;
      }
      if(emailid == ''){
        alert("Please Enter Email Address");
        return;
      }
      db.ref('users').once('value')
        .then(function(snapshot) {
            var count = 0;
            snapshot.forEach((item) => {
              if(item.val().userName == userone){
                  alert("User Recognized");
                  localStorage.setItem("id", item.key);
                  location.href = 'level.html';
                  return;
              }
              count++;
              if(count === snapshot.numChildren()){
                let data = {   
                  userName: userone,
                  email: emailid,
                  score: 0
                };
                const ref = db.ref('users');
                ref.push(data).then((snap) => {
                  alert("registered successfully");
                  localStorage.setItem("id", snap.key);
                  location.href = 'level.html';
                })
                .catch((error) => {
                  alert("Please Try Again After Some Time");
                  return;
                });
              }
            });
            if(snapshot.numChildren() == 0 ){
                let data = {   
                  userName: userone,
                  email: emailid,
                  score: 0
                };
                const ref = db.ref('users');
                ref.push(data).then((snap) => {
                  alert("registered successfully");
                  localStorage.setItem("id", snap.key);
                  location.href = 'level.html';
                })
                .catch((error) => {
                  alert("Please Try Again After Some Time");
                  return;
                });
              }
        })
        .catch((error) => {
          console.log(error);
          alert("Please Try Again After Some Time");
          return false;
      });
    }
  