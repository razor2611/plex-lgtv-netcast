/**
 * The simple menu for media used for subtitles, audio, etc streams
 * <p>
 * The media as watched/unwatched, rate it etc.
 * </p>
 *
 * @author Nastase Lucian Alexandru, http://www.softarea.ro
 *
 * @constructor
 * @param {object} media The media object.
 * @param (string) type The type of the menu
 * @param {object} [returnView] The view to return to
 */
function SimpleMenuView(media, type, returnView) {

    var view = document.getElementById('simple-menu');
    var active;
    var title = null;
    var items = null;

    function show() {
        view.style.display = 'block';
  
        DOM.addClass(view.firstChild, 'active');
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

    this.onUp = function () {
        var prev = DOM.getPreviousElement(active);
        if (prev) {
            DOM.removeClass(active, 'active');
            DOM.addClass(prev, 'active');
            active = prev;
        }
    };
    this.onDown = function () {
        var next = DOM.getNextElement(active);
        if (next) {
            DOM.removeClass(active, 'active');
            DOM.addClass(next, 'active');
            active = next;
        }
    };
    this.onLeft = function () {
    };
    this.onRight = function () {
    };
    this.onEnter = function () {
        var id = active.getAttribute('id');
        var key = active.getAttribute('data-key');

        if(key) {
            video.subtitle = plexAPI.getURL(key);
            video.subtitleOn = true; 
        }
        else {      
           if(id == "disablesubs")
           video.subtitleOn = false;      
        }
        hide();
    };
    this.onBack = function () {
        close();
    };
    this.onStop = function () {
        close();
    };
    this.show = function() {
        show();
    }
    this.hide = function () {
        hide(); 
    }
    
    this.render = function () {
         
         if(type == "subs")
         title = "Subtitles Menu";  
          
        // Clear the previous data and set the title
        view.innerHTML = '<h1>'+title+'</h1>';

        var list = document.createElement('ul');
        
        if(type == "subs") {
            var item;
            for (i = 0; i < media.subtitles.length; i++) {
                var sub = media.subtitles[i];
                if(sub.key) {
                item = document.createElement('li');
                item.setAttribute('id', sub.id);
                if(sub.language)
                item.appendChild(document.createTextNode(sub.language));
                else
                item.appendChild(document.createTextNode("Unknown"));
                item.setAttribute('data-key', sub.key);
                list.appendChild(item);
                items = true;
                }
            }
          if(items)
          {
             item = document.createElement('li');
             item.appendChild(document.createTextNode("Disable"));
             item.setAttribute('data-key', "");
             item.setAttribute('id', "disablesubs");
             list.appendChild(item);            
          }
             item = document.createElement('li');
             item.appendChild(document.createTextNode("Close"));
             item.setAttribute('id', "closesubs");
             item.setAttribute('data-key', "");
             list.appendChild(item);     
        }
        
        view.appendChild(list);

        active = list.firstChild;
        DOM.addClass(active, 'active');

      //  show();
    };

    // Make self-rendering
    this.render();
}