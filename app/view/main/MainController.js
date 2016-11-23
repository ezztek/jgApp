/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('JGApp.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    // requires: [
    //     'jgApp.util.CodePush'
    // ],

    init: function(){
    //   jgApp.util.CodePush.initialize();    
    },

    onBeforeShow: function(tab){        
        console.log('Tab: '+tab._title+' clicked!');
        if (tab._title == 'Update'){
            console.log('Check for app codePush updates');
            // alert('Check for app codePush updates');
            jgApp.util.CodePush.checkForUpdate();
            // var key = "KzmiMD1jgcoaOY_WvfHYXaVbv6EVV1CBBKNbG";
            // codePush.sync(null, { deploymentKey: key, updateDialog: true, installMode: InstallMode.IMMEDIATE });
            return false;
        }
        return true;
    },

    onGetPhoto: function(){
        jgApp.util.Camera.getPicture(false, 'MyPhoto');      
    },

    onTakePhoto: function(){
        jgApp.util.Camera.getPicture(true, 'MyPhoto');
    },

    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    }
});
