Apparator = new Object();

Apparator.display = 'grid';

Apparator.init = function(homediv) {
  Apparator.current = homediv;
  document.getElementById(homediv).style.display = Apparator.display;
};

Apparator.goto = function(newdiv) {
  document.getElementById(Apparator.current).style.display = 'none';
  eval(document.getElementById(Apparator.current).getAttribute('onappout'));

  Apparator.current = newdiv;
  document.getElementById(newdiv).style.display = Apparator.display;
  eval(document.getElementById(Apparator.current).getAttribute('onappinto'));
}

defaultSvg = '<rect\nx=10\ny=10\nwidth=80\nheight=80\nfill=#10f0f0\nstroke=#202020\nstroke-width=5\n/>';

function init() {
  Apparator.init('editor');

  loadedCode = localStorage.getItem('svgcode');
  if(loadedCode!=null){
    document.getElementById('svgcode').innerHTML = loadedCode;
  }
  else{
    document.getElementById('svgcode').innerHTML = defaultSvg;
  }
  applySettings();
  window.onbeforeunload = closeApp;
}

function closeApp(){
  saveCode();
  saveSettings();
}

function hideEditor() {
  saveCode();
}

function showPreview() {
  applySettings();
  document.getElementById('svgpreview').innerHTML = loadCode();
}

function saveCode() {
  localStorage.setItem('svgcode',document.getElementById('svgcode').value);
}
function loadCode() {
  return localStorage.getItem('svgcode');
}
function saveSettings() {
  localStorage.setItem('svgwidth',document.getElementById('svgwidth').value);
  localStorage.setItem('svgheight',document.getElementById('svgheight').value);
  applySettings();
}
function applySettings() {
  loadedSvgWidth = localStorage.getItem('svgwidth');
  loadedSvgHeight = localStorage.getItem('svgheight');

  if(loadedSvgWidth!=null){
    document.getElementById('svgpreview').setAttribute('viewBox',`0 0 ${loadedSvgWidth} ${loadedSvgHeight}`);
    document.getElementById('svgwidth').value = loadedSvgWidth;
  }
  else{
    document.getElementById('svgpreview').setAttribute('viewBox','0 0 100 100');
    document.getElementById('svgheight').value = loadedSvgHeight;
  }
}

function saveFile() {
  saveCode();
  loadedSvgWidth = localStorage.getItem('svgwidth');
  loadedSvgHeight = localStorage.getItem('svgheight');

  filename = prompt('Enter file name','.svg');

  download(`<svg width="${loadedSvgWidth}" height="${loadedSvgHeight}">\n`+textvg(loadCode())+'\n</svg>',filename,'image/svg+xml')
}
