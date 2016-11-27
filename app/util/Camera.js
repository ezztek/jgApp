Ext.define('JGApp.util.Camera', {
    singleton: true,
    imgID    : '',
    cls      : 'JGApp.util.Camera',

    getPicture: function(fromCamera, ElementID){
        var me = this;
        Ext.toast(me.cls+' => fromCamera: '+fromCamera+', ElementID: '+ElementID);
        me.imgID = ElementID;
        navigator.camera.getPicture(
            function(imageURI) {
                Ext.toast('imgID: '+me.imgID);
                // var image = document.getElementById(me.imgID);
                var image = document.getElementById('MyPhoto');
                Ext.toast('image: '+image+', imageURI: '+imageURI);
                image.src = imageURI;
            },

            function(message) {
                alert('Failed because: ' + message);
            },
            // me.onSuccess, me.onFail, 
            {
            quality        : 50,    
            sourceType     : fromCamera == true ? Camera.PictureSourceType.Camera : Camera.PictureSourceType.PHOTOLIBRARY,    
            destinationType: Camera.DestinationType.FILE_URI
            // allowEdit      : true,
            // correctOrientation: true  //Corrects Android orientation quirks
        });

        // navigator.camera.getPicture(this.onSuccess, this.onFail, 
        // { 
        //     quality: 50,
        //     destinationType: Camera.DestinationType.FILE_URI,
        //     // In this app, dynamically set the picture source, Camera or photo gallery
        //     sourceType: fromCamera ? Camera.PictureSourceType.CAMERA : Camera.PictureSourceType.PHOTOLIBRARY,
        //     encodingType: Camera.EncodingType.JPEG,
        //     // mediaType: Camera.MediaType.PICTURE,
        //     allowEdit: true,
        //     correctOrientation: true  //Corrects Android orientation quirks 
        // });
    },

    onSuccess: function(imageURI) {
        Ext.toast('imgID: '+imgID);
        var image = document.getElementById(this.imgID);
        Ext.toast('image: '+image+', imageURI: '+imageURI);
        image.src = imageURI;
    },

    onFail: function(message) {
        alert('Failed because: ' + message);
    }
  
});