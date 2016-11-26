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
            iconAlign: 'top', 
            listeners: { 
                tap: 'onBeforeShow',
                afterrender: 'onAfterRender' 
            }
        },
        styleHtmlContent: true
    },

    tabBarPosition: 'bottom',
    
    items: [
        {
            title  : 'JMG2',
            iconCls: 'x-fa fa-home',
            layout : 'fit',                        
            items  : [{ xtype: 'mainlist' }] // The following grid shares a store with the classic version's grid as well!
        },
        {
            title  : 'Pix',
            iconCls: 'x-fa fa-user',
            // bind   : { html: '<div id="divStatus">CURRENT PLACEHOLDER</div><div>{loremIpsum}</div>' }
            xtype: 'formpanel',
            items: [
                {
                    xtype: 'fieldset',
                    defaults: { labelWidth: '35%' },
                    title: 'Information',
                    items: [
                        { xtype: 'textfield', label: 'First Name', name: 'firstName' },
                        { xtype: 'textfield', label: 'Last Name', name: 'lastName' },
                        { xtype: 'textfield', label: 'Title', name: 'title' }
                    ]// info items
                },
                {
                    xtype: 'fieldset',
                    defaults: { labelWidth: '35%' },
                    title: 'Contact Information',
                    items: [
                        { xtype: 'textfield', label: 'Telephone', name: 'telephone' }
                    ]
                },
                // {
                //     xtype: 'fieldset',
                //     title: 'Address',
                //     defaults: { labelWidth: '35%' },
                //     items: [
                //         { xtype: 'textfield', label: 'City', name: 'city' },
                //         { xtype: 'textfield', label: 'State', name: 'state' },
                //         { xtype: 'textfield', label: 'Country', name: 'country' }
                //     ]
                // },
                {
                    xtype: 'fieldset',
                    title: 'Get Photo',
                    layout: 'hbox',
                    defaults: { labelWidth: '35%' },
                    items: [
                        { xtype: 'button', text: 'Get Photo', handler: 'onGetPhoto' }, 
                        { xtype: 'spacer', width: '20px' },                      
                        { xtype: 'button', text: 'Take Photo', handler: 'onTakePhoto' },                        
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'My Photo',
                    defaults: { labelWidth: '0%' },
                    items: [                        
                        { xtype: 'image', height: '50px', id:'MyPhoto', src: 'http://www.sencha.com/assets/images/sencha-avatar-64x64.png' }
                    ]
                }
            ]
        },
        {
            title  : 'Groups',
            iconCls: 'x-fa fa-users',            
            bind   : { html: '{loremIpsum}' }
        },
        {
            title  : 'Update',
            iconCls: 'x-fa fa-cog',            
            bind   : { html: '{loremIpsum}' },                        
            // tab    : { listeners: { tap: 'onBeforeShow' } }
        }
    ]
});
