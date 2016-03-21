console.log('Started', self);
self.addEventListener('install', function (event) {
    self.skipWaiting();
    console.log('Installed', event);
});
self.addEventListener('activate', function (event) {
    console.log('Activated', event);
});
self.addEventListener('push', function (event) {
    console.log('Push message received', event);
    var title = 'Squirt Notification';
  event.waitUntil(
    self.registration.showNotification(title, {
      body: 'Someone just viewed your profile.',
      icon: './img/icon.png',
      tag: 'my-tag',
	  vibrate:  [300, 100, 400]
    }));
});

self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event.notification.tag);
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(clients.matchAll({
    type: "window"
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url == '/' && 'focus' in client)
        return client.focus();
    }
    if (clients.openWindow)
      return clients.openWindow('notification.html?nType=cruise');
  }));
});