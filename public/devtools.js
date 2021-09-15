let backgroundPageConnection = window.chrome.runtime.connect({
  name: "devtools-page"
});

window.chrome.devtools.panels.create(
  'New panel',
  '',
  'panel.html'
)