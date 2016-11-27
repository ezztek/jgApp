/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('JGApp.Application', {
    extend: 'Ext.app.Application',
    
    name: 'JGApp',

    stores: [
        // TODO: add global / shared stores here
    ],
    
    // requires: [
    //     'jgApp.util.CodePush'
    //     ,'jgApp.util.Camera'
    // ],

    launch: function () {
        // TODO - Launch the application
        var str = "Application - Launch called!";        
        console.log(str);
        JGApp.util.CodePush.initialize();
        JGApp.util.PushNotifications.initialize();
        navigator.splashscreen.hide();
        //alert(str);
        // document.addEventListener('deviceready', jgApp.util.CodePush.check4Updates.bind(this), false);
        // jgApp.util.CodePush.initialize();

/*
        var app = {
            // Application Constructor
            initialize: function () {
                document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
                console.log('app.initialize called');
            },

            deploymentKeyStaging: "KzmiMD1jgcoaOY_WvfHYXaVbv6EVV1CBBKNbG",

            deploymentKeyPROD: "5BcD0J2nrzehZAxtEOS0mIKkacW4V1CBBKNbG",

            // deviceready Event Handler => Bind any cordova events here. Common events are: 'pause', 'resume', etc.
            onDeviceReady: function () {
                console.log('app onDeviceReady event called');
                app.receivedEvent('deviceready');
                // codePush.sync(null, { updateDialog: true, installMode: InstallMode.IMMEDIATE });                
                codePush.sync(null, { deploymentKey: app.deploymentKeyStaging, updateDialog: true, installMode: InstallMode.IMMEDIATE });
                var msg = "Staging key: "+app.deploymentKeyStaging+", Prod: "+app.deploymentKeyPROD;
                console.log(msg);
                try{ document.getElementById("divStatus").innerHTML=msg; }
                catch(e){ console.log('Error: '+e)}; 
                alert(msg);                                        
            },

            // Update DOM on a Received Event
            receivedEvent: function (id) {                
                console.log('app.receivedEvent called!');
                var parentElement, listeningElement, receivedElement;

                try{
                    parentElement = document.getElementById(id);
                    listeningElement = parentElement.querySelector('.listening');
                    receivedElement = parentElement.querySelector('.received');
                    listeningElement.setAttribute('style', 'display:none;');
                    receivedElement.setAttribute('style', 'display:block;');        
                }
                catch(e){
                    console.log('app.receivedEvent Error: '+e);
                }                                

                console.log('Received Event: ' + id);
            }
            ,UpdateReady: function(update){
                if (update){ alert("An update is available"); }
                else{ alert("No updates available"); }        
            }
        };// app

        app.initialize();
*/
        // document.getElementById('get-picture').addEventListener('click', getPicture, false);
        // document.getElementById('take-picture').addEventListener('click', takePicture, false);
        

    },// launch

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
