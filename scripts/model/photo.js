function Photo(elem) {
   
    var parent = elem.getAttribute('key');
    var title = elem.getAttribute('title');
    var type = elem.getAttribute('type');
    var thumb = elem.getAttribute('thumb');
    var year = elem.getAttribute('year');
    
    var width = null;
    var height = null;
    var aspectratio = null;
    var key = null;
    var extension = null;

    var children = elem.childNodes;
    var mediaCount = children.length;
    for (var i = 0; i < mediaCount; i++) {
        var media = children[i];
        if (media.nodeName !== 'Media') {
            continue;
        } 
        width = media.getAttribute('width');
        height = media.getAttribute('height');
        aspectratio = media.getAttribute('aspectRatio');
        
        var pchildren = media.childNodes;
        var pmediaCount = pchildren.length;
          for (var y = 0; y < mediaCount; y++) {
              var part = pchildren[i];
              key = part.getAttribute('key');
              extension = part.getAttribute('container'); 
          }    
    }
    
    return {
        key: key,
        parent: parent,
        type: type,
        container: false,
        extension: extension,
        title: title,
        aspectratio: aspectratio,
        thumb: thumb,
        width: width,
        height: height,
        year: year
    };
}