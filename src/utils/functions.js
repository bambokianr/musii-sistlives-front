export function isURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
    '((\\d{1,3}\\.){3}\\d{1,3}))'+
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
    '(\\?[;&a-z\\d%_.~+=-]*)?'+
    '(\\#[-a-z\\d_]*)?$','i');
  
  return !!pattern.test(str);
}

export function isBase62(str) {
  var pattern = new RegExp('^([a-zA-Z0-9]+)$');
  if (str.length !== 22) return false;
  
  return !!pattern.test(str);
};
