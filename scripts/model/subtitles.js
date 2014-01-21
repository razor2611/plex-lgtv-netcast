function Subtitles(elem) {
    
   var id = elem.getAttribute('id'); 
   var index = elem.getAttribute('index'); 
   var language = elem.getAttribute('language'); 
   var language_code = elem.getAttribute('languageCode'); 
   var format = elem.getAttribute('format'); 
   var key =  elem.getAttribute('key');
   var selected =  elem.getAttribute('selected');
   
    return {
        id: id,
        index: index,
        key: key,
        selected: selected,
        language: language,
        language_code: language_code,
        format: format
    };      
}