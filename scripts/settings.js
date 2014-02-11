function Settings() {
    var _pms = "192.168.178.10";
    var _debug = false;
    var _debugUUID = 'default';
    var _anim = true;
    var _blobs = true;
    var _bgart = true;
    

    function getCookie(name) {
        var x,y,ARRcookies=document.cookie.split(';');
        var n = ARRcookies.length;
        for (var i = 0; i < n; i++) {
            x=ARRcookies[i].substr(0,ARRcookies[i].indexOf('='));
            y=ARRcookies[i].substr(ARRcookies[i].indexOf('=')+1);
            x=x.replace(/^\s+|\s+$/g,'');
            if (x === name) {
                return unescape(y);
            }
        }
    }
    function setCookie(name,value,exdays) {
        var exdate=new Date();
        exdate.setDate(exdate.getDate() + exdays);
        value = escape(value) + ((exdays===null) ? '' : '; expires='+exdate.toUTCString());
        document.cookie = name + '=' + value;
    }

    function deleteCookie(name) {
        setCookie(name, '', -1);
    }

    function activateDebug(id) {
        var g=document.createElement('script');
        var s=document.getElementsByTagName('script')[0];
        g.src='http://jsconsole.com/remote.js?'+id;
        s.parentNode.insertBefore(g,s);
    }

    this.init = function() {
     
         // set some settings off by default
         if(getCookie('lgtv_plex_disable_bgart') === undefined)
         setCookie('lgtv_plex_disable_bgart', true);
         if(getCookie('lgtv_plex_disable_anim') === undefined)
         setCookie('lgtv_plex_disable_anim', true);
         
                 
        _pms = getCookie('lgtv_plex_pms_ip');
        _debug = getCookie('lgtv_plex_debug') === 'true';
        _debugUUID = getCookie('lgtv_plex_debug_uuid');
        _anim = getCookie('lgtv_plex_disable_anim') !== 'true';
        _bgart = getCookie('lgtv_plex_disable_bgart') !== 'true';
        _blobs = getCookie('lgtv_plex_disable_blobs') !== 'true';
          
        if (_debugUUID === undefined) {
            _debugUUID = 'lgttv-plex-' + UUID.simple();
            setCookie('lgtv_plex_debug_uuid', _debugUUID);
        }

        if (_debug) {
            activateDebug(_debugUUID);
        }
         
       
        console.log('Using PMS: ' + _pms);
        return _pms !== null && _pms !== undefined;
    };
    
    this.reset = function() {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
          deleteCookie(cookies[i].split('=')[0]);
        }
    };

    this.setPMS = function(pms) {
        setCookie('lgtv_plex_pms_ip', pms, 3600);
        _pms = pms;
    };
    this.getPMS = function() {
		return _pms;
    };

    this.getDebug = function () {
        return _debug;
    };
    this.getDebugUUID = function () {
        return _debugUUID;
    };
    this.setDebug = function(debug) {
        setCookie('lgtv_plex_debug', debug, 3600);
        _debug = debug;
    };

    this.setAnim = function(anim) {
        setCookie('lgtv_plex_disable_anim', !anim, 3600);
        _anim = anim;
    };

    this.useAnim = function() {
        return _anim;
    };
    
    this.setBlobs = function(blobs) {
        setCookie('lgtv_plex_disable_blobs', !blobs, 3600);
        _blobs = blobs;
    };
    
    this.useBlobs = function() {
        return _blobs;
    };    

    this.setBgArt = function(bgart) {
        setCookie('lgtv_plex_disable_bgart', !bgart, 3600);
        _bgart = bgart;
    };   
         
    this.useBgArt = function() {
        return _bgart;
    };     
    
}

window.Settings = new Settings();
