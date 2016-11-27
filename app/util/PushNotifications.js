Ext.define('JGApp.util.PushNotifications', {
    singleton: true,    
    cls      : 'JGApp.util.PushNotifications',
    senderID : '731504384124',
    gcmAPIKey: 'AIzaSyB2XHexpcDgwpOJJUrpIZUzx6ljg3_-xHU',

    initialize: function () {
        JGApp.util.DomHelpers.addStatusLI(this.cls+' => initialize called');
        var me = this;
        document.addEventListener('deviceready', this.onDeviceReady.bind(me), false);        
    },

    onDeviceReady: function() {
        var push = {};       
        JGApp.util.DomHelpers.addStatusLI(this.cls+' => deviceready event received');
        
        try{
            push = PushNotification.init({
                android: { senderID: this.senderID },
                browser: { pushServiceURL: 'http://push.api.phonegap.com/v1/push' },
                ios    : { alert: "true", badge: "true", sound: "true" },
                windows: {}
            });
            JGApp.util.DomHelpers.addStatusLI(this.cls+' => No errors calling push.init function');
        }
        catch(e){
            JGApp.util.DomHelpers.addStatusLI(this.cls+' => Error setting up push notifications: '+e);
        }
        
        push.hasPermission(function(data) {
            if (data.isEnabled) { JGApp.util.addStatusLI(this.cls+' => isEnabled'); }
        });
        push.on('registration', function(data) {            
            JGApp.util.addStatusLI(this.cls+' => registrationID: '+data.registrationId)
        });

        push.on('notification', function(data) {
            var msg = 'Message: '+ data.message +
                      ', title: '+ data.title +
                      ', count: '+ data.count +
                      ', sound: '+ data.sound +
                      ', image: '+ data.image +
                      ', addData: '+ data.additionalData;
            JGApp.util.addStatusLI(this.cls+' => '+msg);
        });

        push.on('error', function(e) {
            JGApp.util.addStatusLI(this.cls+' => Error: '+ e.message);
        });
        
/*
        document.addEventListener("backbutton", function(e){
            // $("#app-status-ul").append('<li>backbutton event received</li>');
            log(this.cls+' => backbutton event received');
            
            if( $("#home").length > 0){
                // call this to get a new token each time. don't call it to reuse existing token.
                //pushNotification.unregister(successHandler, errorHandler);
                e.preventDefault();
                navigator.app.exitApp();
            }
            else{
                navigator.app.backHistory();
            }
        }, false);
    
        try { 
            log(this.cls+' => registering ' + device.platform + ", senderID: "+me.senderID);
            pushNotification = window.plugins.pushNotification;     

            if (device.platform == 'android' || device.platform == 'Android' || device.platform == 'amazon-fireos' ){   
                // cordova.exec(this.successHandler, this.errorHandler, "PushPlugin", "setApplicationIconBadgeNumber", 
                // [ {badge: { "senderID": me.senderID,"ecb": me.onNotification } } ]);             
                pushNotification.register(this.successHandler, this.errorHandler, 
                { "senderID": me.senderID,"ecb": me.onNotification });		// required!
                // {"senderID":this.senderID,"ecb":"onNotification"});		// required!
            } else {
                pushNotification.register(this.tokenHandler, this.errorHandler, 
                { "badge": "true", "sound": "true", "alert": "true", "ecb": me.onNotificationAPN });	// required!
                // {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});	// required!
            }
        }
        catch(err) { 
            txt=this.cls+" => There was an error on this page.\n\n"; 
            txt+="Error description: " + err.message + "\n\n"; 
            alert(txt); 
        } 
*/        
    }, // onDeviceReady
    
    // handle APNS notifications for iOS
    onNotificationAPN: function(e) {
        if (e.alert) {
            JGApp.util.DomHelpers.addStatusLI(this.cls+' => push-notification: ' + e.alert);
            // showing an alert also requires the org.apache.cordova.dialogs plugin
            navigator.notification.alert(e.alert);
        }
            
        if (e.sound) {
            // playing a sound also requires the org.apache.cordova.media plugin
            var snd = new Media(e.sound);
            snd.play();
        }
        
        if (e.badge) {
            window.plugins.pushNotification.setApplicationIconBadgeNumber(this.successHandler, e.badge);
            // pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
        }
    }, // onNotificationAPN
    
    // handle GCM notifications for Android
    onNotification: function(e) {
        JGApp.util.DomHelpers.addStatusLI(this.cls+' => EVENT -> RECEIVED:' + e.event);

        switch( e.event ){
            case 'registered':
            if ( e.regid.length > 0 ){
                JGApp.util.DomHelpers.addStatusLI(this.cls+' => REGISTERED -> REGID:' + e.regid);
                // Your GCM push server needs to know the regID before it can push to this device
                // here is where you might want to send it the regID for later use.
                console.log("regID = " + e.regid);
            }
            break;
            
            case 'message':
                // if this flag is set, this notification happened while we were in the foreground.
                // you might want to play a sound to get the user's attention, throw up a dialog, etc.
                if (e.foreground){
                    JGApp.util.DomHelpers.addStatusLI(this.cls+' => --INLINE NOTIFICATION--');
                        
                        // on Android soundname is outside the payload. 
                            // On Amazon FireOS all custom attributes are contained within payload
                            var soundfile = e.soundname || e.payload.sound;
                            // if the notification contains a soundname, play it.
                            // playing a sound also requires the org.apache.cordova.media plugin
                            var my_media = new Media("/android_asset/www/"+ soundfile);

                    my_media.play();
                }
                else
                {	// otherwise we were launched because the user touched a notification in the notification tray.
                    if (e.coldstart)
                        JGApp.util.DomHelpers.addStatusLI(this.cls+' => --COLDSTART NOTIFICATION--');
                    else
                        JGApp.util.DomHelpers.addStatusLI(this.cls+' => --BACKGROUND NOTIFICATION--');
                }
                    
                JGApp.util.DomHelpers.addStatusLI(this.cls+' => MESSAGE -> MSG: ' + e.payload.message);
                //android only
                JGApp.util.DomHelpers.addStatusLI(this.cls+' => MESSAGE -> MSGCNT: ' + e.payload.msgcnt);
                //amazon-fireos only
                JGApp.util.DomHelpers.addStatusLI(this.cls+' => MESSAGE -> TIMESTAMP: ' + e.payload.timeStamp);
            break;
            
            case 'error':
                JGApp.util.DomHelpers.addStatusLI(this.cls+' => ERROR -> MSG:' + e.msg);
            break;
            
            default:
                JGApp.util.DomHelpers.addStatusLI(this.cls+' => EVENT -> Unknown, an event was received and we do not know what it is');
            break;
        }
    },// onNotification

    tokenHandler: function(result) {
        JGApp.util.DomHelpers.addStatusLI(this.cls+' => token: '+ result);
        // Your iOS push server needs to know the token before it can push to this device
        // here is where you might want to send it the token for later use.
    },
    
    successHandler: function(result) {
        JGApp.util.DomHelpers.addStatusLI('JGApp.util.PushNotifications => success:'+ result);
    },
    
    errorHandler: function(error) {
        JGApp.util.DomHelpers.addStatusLI('JGApp.util.PushNotifications => error:'+ error);
    }
});            