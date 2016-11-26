/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('JGApp.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias : 'controller.main',

    requires: [
        'Ext.Toast',
        'JGApp.util.CodePush',
        'JGApp.util.Camera'
    ],

    init: function(){
        console.log('MainController.init => Function called');        
        JGApp.util.CodePush.initialize();          
    },

    onAfterRender: function(){
        navigator.splashscreen.hide();
    },

    onBeforeShow: function(tab){        
        console.log('Tab: '+tab._title+' clicked!');
        if (tab._title == 'Update'){
            console.log('Check for app codePush updates');            
            JGApp.util.CodePush.check4Updates();            
            return false;
        }
        return true;
    },
    
    onGetPhoto: function(){
        JGApp.util.Camera.getPicture(false, 'MyPhoto');      
    },

    onTakePhoto: function(){
        JGApp.util.Camera.getPicture(true, 'MyPhoto');
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
