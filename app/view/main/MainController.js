/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('JGApp.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    init: function(){
        
    },

    onBeforeShow: function(tab){
        console.log('Tab: '+tab.title+' clicked!');
        if (tab.title == 'Update'){
            var key = "KzmiMD1jgcoaOY_WvfHYXaVbv6EVV1CBBKNbG";
            codePush.sync(null, { deploymentKey: key, updateDialog: true, installMode: InstallMode.IMMEDIATE });
        }
        return false;
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
