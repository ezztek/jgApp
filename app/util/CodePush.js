Ext.define('JGApp.util.CodePush', {
    singleton           : true,
    deploymentKeyStaging: "KzmiMD1jgcoaOY_WvfHYXaVbv6EVV1CBBKNbG",
    deploymentKeyPROD   : "5BcD0J2nrzehZAxtEOS0mIKkacW4V1CBBKNbG",
    cls: 'JGApp.util.CodePush',

    // deviceready Event Handler => Bind any cordova events here. Common events are: 'pause', 'resume', etc.
    initialize: function () {
        var me = this;
        document.addEventListener('deviceready', this.check4Updates.bind(me), false);
        console.log(this.cls+' => initialize called');
    },

    check4Updates: function () {
        console.log(this.cls+' => event called');
        Ext.toast('Checking for updates...');
        // this.receivedEvent('deviceready');
        // codePush.sync(null, { updateDialog: true, installMode: InstallMode.IMMEDIATE });                
        codePush.sync(null, { deploymentKey: this.deploymentKeyStaging, updateDialog: true, installMode: InstallMode.IMMEDIATE });
        Ext.toast('Checking for updates completed');
        var msg = this.cls+" => Staging key: "+this.deploymentKeyStaging+", Prod: "+this.deploymentKeyPROD;
        console.log(msg);
        try{ JGApp.util.DomHelpers.addStatusLI(msg); }
        catch(e){ console.log('Error: '+e)}; 
        // alert(msg);                                        
    },
    
    UpdateReady: function(update){
        if (update){ alert("An update is available"); }
        else{ alert("No updates available"); }        
    }
});