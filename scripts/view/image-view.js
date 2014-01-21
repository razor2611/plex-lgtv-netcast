function ImageView(uri, parent, returnView) {
    
var currentIndex = 0;
var mediaContainer;
var slider = document.getElementById('image-slideshow'); 


var imageurl = plexAPI.getScaledImageURL(plexAPI.getURL(uri), 1280, 720); 
var view = document.getElementById('image-slideshow');
var homeMenu = document.getElementById('home');
var active;

    function show() {
        view.style.display = 'block';
    }
    function hide() {
        DOM.removeClass(active, 'active');
        view.style.display = 'none';
    }
    function close() {
        if (!returnView) {
            window.view = new HomeView();
        }
        else {
            window.view = returnView;
        }
        window.view.reload();
        hide();
    }
    
    
    function playImage() {
        slider.innerHTML = '';
        var image = new Image();
        image.src = imageurl;
        slider.appendChild(image);
    }
    
    function createPlaylist(media) {
           var n = media.length;
           for (var i = 0; i < n; i++) {
              imageurl = plexAPI.getScaledImageURL(plexAPI.getURL(media[i].thumb), 1280, 720);  
              img.src = imageurl; 
              console.log(media); 
           }  
          slider.appendChild(img); 
                     
    }
    
    this.onUp = function () {
         close();
    }

    this.onDown = function () {
         close();
    }
    
    this.onLeft = function () {
         close();
    }
    
    this.onRight = function () {
         close();
    }
    
    this.onEnter = function () {
         close();
    }
 
    this.reload = function () {
        this.render();
    };
        
    this.render = function () {

     playImage(); 
     show();  
    }
    
    // Make self-rendering
    this.render(); 
}