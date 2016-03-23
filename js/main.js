if ('serviceWorker' in navigator) {
    console.log('Service Worker is supported');
    navigator.serviceWorker.register('sw.js').then(function (reg) {
        console.log(':^)', reg);
		if(!('pushManager' in reg)){
			alert("Sorry...push notification is not supported for your combination of device/browser.");
			window.history.back();
			return;
		}
        reg.pushManager.subscribe({
            userVisibleOnly: true
        }).then(function (sub) {
            console.log('endpoint:', sub.endpoint);
            //window.prompt("RegistrationID:" , sub.endpoint);
            //Redirect to the proper place to register the device passing in the
            //parsed value from the EndPoint
            var parseArray = sub.endpoint.split("/");
            window.location = "http://dev.mobile.squirt.org/Profile/SetDeviceId?deviceId=" + parseArray[parseArray.length - 1];
        });
    }).catch(function (error) {
        console.log(':^(', error);
    });
}

