function determineAppServerKey() {
  var vapidPublicKey = "BB5RfcOjCmlSn5iUrYaeS1KdNzxrk8r3Q_MPSxg-MnqQhXnq14119iZIVHo9Ma8CtX8VMCG-fwPJa6lZBJb7glk";
  return urlBase64ToUint8Array(vapidPublicKey);
}

function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

if ("serviceworker" in navigator) {
  // window.addEventListener("load", function () {
  navigator.serviceWorker
    .register("./serviceworker.js")
    .then(
      async (response) => {
        const subscription = await response.pushManager.getSubscription();
        return await response.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: determineAppServerKey()
        }).catch(error => {
          console.log("Registration failed");
          console.log(error);
        });
      })
}




