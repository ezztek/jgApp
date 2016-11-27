Ext.define('JGApp.util.DomHelpers', {
    singleton: true,
    cls      : 'JGApp.util.DomHelpers',

    init: function(){
        var me = this;
        document.addEventListener('deviceready', this.startInterval.bind(me), false);
        console.log(this.cls+' => init called');
    },

    startInterval: function(){
        window.try = 0;
        this.showMessage();
    },

    showMessage: function(){
        if (window.try == 0){ 
            window.intID = window.setInterval(this.showMessage, 5000);
            window.try += 1;
        }
        else if (window.try > 5){ 
            clearInterval(window.intID); 
        }
        else{ 
            switch(window.try){
                case 1:
                    navigator.notification.alert(
                        'System alert message',  // message
                        this.alertDismissed,         // callback
                        'Alert',            // title
                        'Done'                  // buttonName
                    );
                    break;

                case 2:                    
                    navigator.notification.confirm(
                        'Confirm message', // message
                        function onConfirm(buttonIndex) {
                            alert('You selected button ' + buttonIndex);
                        },            // callback to invoke with index of button pressed
                        'System Confirm',           // title
                        ['Agree','Cancel']     // buttonLabels
                    );
                    break;

                case 3:                    
                    navigator.notification.prompt(
                        'Please enter your name',  // message
                        function onPrompt(results) {
                            alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
                        },                  // callback to invoke
                        'System Prompt',            // title
                        ['Ok','Exit'],             // buttonLabels
                        'Jane Doe'                 // defaultText
                    );
                    break;

                case 4:
                    navigator.notification.beep(2);
                    break;
                
                default:
                    alert('showMessage called for the '+window.try+' time');
            }// switch(window.try){

            window.try += 1;
        }
    },// showMessage

    addStatusLI: function(msg){
        var ul = document.getElementById("app-status-ul");
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(msg));
        ul.appendChild(li);
    }
});