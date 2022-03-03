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
    db.ref('users').orderByChild('score').once('value')
      .then(function(snapshot) {
        
          var count = 1;
          var userlist = []
          snapshot.forEach((item) => {
            userlist.push(item.val())
          });

          userlist.reverse();
          userlist.forEach((item) => {
            userName = item.userName;
            userEmail = item.email;
            userScore = item.score;
            document.getElementById('table_body').innerHTML += 
            "<tr><td>"+count+"</td><td>"+userName+"</td><td>"+userEmail+"</td><td>"+userScore+"</td></tr>";
            count++;
          });

      })
      .catch((error) => {
        console.log(error);
        return false;
    });
  