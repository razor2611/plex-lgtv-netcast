function Blobs() {     
    
    var small_image = new Array();
    var large_image = new Array();
    var art_image = new Array();
    var width = null;
    var height = null;

    this.registerBlob = function(key, value, type) {
        if(type == "small")
        small_image[key] = value;
        else if(type == "large")
        large_image[key] = value;
        else if(type == "art")
        art_image[key] = value;   
    }

    this.retrieveBlob = function(key, type) {
        var result;
        
        if(type == "small")
        result = small_image[key];
        else if(type == "large")
        result = large_image[key];
        else if(type == "art")
        result = art_image[key];       
        
        return result;
    }
    
    
    this.imageBlob = function(thumb, type) {
        
        if(type == "small")
        {
            width = "110";
            height = "150";  
        }
        else if(type == "large")
        {
            width = "245";
            height = "360";
        }
        else if(type == "art")
        {
            width = "1280";
            height= "720";
        }    

        if(!Blobs.retrieveBlob(thumb, type))
        {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", 'http://'+Settings.getPMS()+':32400/photo/:/transcode?width='+width+'&height='+height+'&url='+encodeURIComponent(thumb), true);
            xhr.responseType = "arraybuffer";
            //xhr.setRequestHeader('Accept-Encoding','gzip, deflate');
            xhr.onload = function( e ) {
            // Obtain a blob: URL for the image data.
            var arrayBufferView = new Uint8Array( this.response );
            var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL(blob);
            Blobs.registerBlob(thumb, imageUrl, type);
            //blobs[""+thumb+""] = ""+imageUrl+"";
            };

            xhr.send(null);
        }  
    }
    

      

}

window.Blobs = new Blobs();