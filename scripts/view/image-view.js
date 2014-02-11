function ImageView(uri, parent, returnView) {
    
var slider = document.getElementById('image-slideshow'); 
var view = document.getElementById('image-slideshow');
var homeMenu = document.getElementById('scroller-recentlyadded');
var homeItem = document.getElementById('current-recentlyadded');
var parentItem; 
var started = false;
var slideshowTimer;
var active;
var imageurl;


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
        clearInterval(slideshowTimer);
    }
    
    
    function playImage(uri) {
        slider.innerHTML = '';
        var imageurl = plexAPI.getScaledImageURL(plexAPI.getURL(uri), 1280, 720); 
        var image = new Image();
        image.src = imageurl;
        slider.appendChild(image);
    }
    
    function nextImage() {
        var next = DOM.getNextElement(active);
        if (next) {
            playImage(next.getAttribute('data-key'));
            if(parent) {
                DOM.removeClass(active, 'active');
                DOM.addClass(next, 'active');
            }
            active = next;
        }          
    }
    
    function prevImage() {
        var prev = DOM.getPreviousElement(active);
        if (prev) {
            playImage(prev.getAttribute('data-key'));
            if(parent) {
                DOM.removeClass(active, 'active');
                DOM.addClass(prev, 'active');
            }
            active = prev;
        }        
    }    
    
    function imageSlideshow(uri) {
        if(started)
        nextImage();
        else
        playImage(uri); 
    }
    
    this.onUp = function () {
         close();
    }

    this.onDown = function () {
         close();
    }
    
    this.onLeft = function () {
        prevImage();
    }
    
    this.onRight = function () {
        nextImage();  
    }
    
    this.onEnter = function () {
         close();
    }
 
    this.reload = function () {
        this.render();
    };
        
    this.render = function () { 
     if(parent) {
     active = DOM.getNthElement(document.getElementById('list-scroller'), parent);
     }
     else  
     active = homeItem;   
        
     playImage(uri); 
     started = true;
     slideshowTimer = setInterval(function(){imageSlideshow(uri)}, 5000);
     show();  
    }
    
    // Make self-rendering
    this.render(); 
}