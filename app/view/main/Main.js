/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 *
 * TODO - Replace the content of this view to suit the needs of your application.
 */
Ext.define('JGApp.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.MessageBox',

        'JGApp.view.main.MainController',
        'JGApp.view.main.MainModel',
        'JGApp.view.main.List'
    ],

    controller: 'main',
    viewModel: 'main',

    defaults: {
        tab: {
            iconAlign: 'top'
        },
        styleHtmlContent: true
    },

    tabBarPosition: 'bottom',

    items: [
        {
            title: 'JMG2',
            iconCls: 'x-fa fa-home',
            layout: 'fit',            
            // The following grid shares a store with the classic version's grid as well!
            items: [{
                xtype: 'mainlist'
            }]
        },{
            title: 'Users',
            iconCls: 'x-fa fa-user',
            bind: {
                html: '<div id="divStatus">CURRENT PLACEHOLDER</div><div>{loremIpsum}</div>'
            }
        },{
            title: 'Groups',
            iconCls: 'x-fa fa-users',            
            bind: {
                html: '{loremIpsum}'
            }
        },{
            title: 'Update',
            iconCls: 'x-fa fa-cog',
            bind: {
                html: '{loremIpsum}'
            }
        }
    ]

    ,listeners: {
        tap: 'onBeforeShow'
    }
});
