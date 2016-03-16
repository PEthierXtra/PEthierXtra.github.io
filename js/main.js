if ('serviceWorker' in navigator) {
    console.log('Service Worker is supported');
    navigator.serviceWorker.register('sw.js').then(function (reg) {
        console.log(':^)', reg);
        reg.pushManager.subscribe({
            userVisibleOnly: true
        }).then(function (sub) {
            console.log('endpoint:', sub.endpoint);
			window.prompt("RegistrationID:" , sub.endpoint);
        });
    }).catch(function (error) {
        console.log(':^(', error);
    });
}