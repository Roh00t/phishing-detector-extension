const url = window.location.href;
const suspiciousPatterns = [/login/i, /secure/i, /bank/i, /xn--/i];

if (suspiciousPatterns.some(pattern => pattern.test(url))) {
  alert("⚠️ Warning: This site may be phishing!");
}
