Ext.define('JGApp.util.Camera', {
    singleton: true,
    imgID: '',

    getPicture: function(fromCamera, ElementID){
        this.imgID = ElementID;
        navigator.camera.getPicture(this.onSuccess, this.onFail, {
            quality        : 50,    
            sourceType     : fromCamera ? Camera.PictureSourceType.Camera : Camera.PictureSourceType.PHOTOLIBRARY,    
            destinationType: Camera.DestinationType.FILE_URI,
            allowEdit      : true,
            correctOrientation: true  //Corrects Android orientation quirks
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
        var image = document.getElementById(this.imgID);
        image.src = imageURI;
    },

    onFail: function(message) {
        alert('Failed because: ' + message);
    }
  
});