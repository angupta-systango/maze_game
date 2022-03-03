if("serviceWorker" in navigator){
    navigator.serviceWorker.register("./serviceworker.js").then((response) =>{
        console.log("SW registered!");
        console.log(response);
    }).catch(error=>{
      console.log("SW Registration Failed");
      console.log(error);
    });
    }
         