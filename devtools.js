const PANEL_CONFIG = {
  title: 'XHRinfo',
  iconPath: '',
  pagePath: 'app/build/index.html'
};

(function createNewPanel() {
  window.chrome.devtools.panels.create(PANEL_CONFIG.title, PANEL_CONFIG.iconPath, PANEL_CONFIG.pagePath)
}());
