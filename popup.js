chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  const url = tabs[0].url;
  document.getElementById("urlDisplay").textContent = url;

  if (/login|bank|xn--/.test(url)) {
    document.getElementById("status").textContent = "Possible phishing!";
  } else {
    document.getElementById("status").textContent = "Safe site.";
  }
});