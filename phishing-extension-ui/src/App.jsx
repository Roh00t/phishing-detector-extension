// src/App.jsx
import { useEffect, useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('Scanning...');
  const [details, setDetails] = useState(null);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const tabUrl = tabs[0].url;
      setUrl(tabUrl);

      try {
        const res = await fetch('http://localhost:3001/classify-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: tabUrl }),
        });

        const data = await res.json();
        const maliciousCount = data.report.attributes.last_analysis_stats.malicious;
        setStatus(maliciousCount > 0 ? '⚠️ Phishing!' : '✅ Safe');
        setDetails(data);
      } catch (err) {
        setStatus('❌ Error connecting to API');
      }
    });
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '10px', maxWidth: '300px' }}>
      <h2>Phishing Detector</h2>
      <p><strong>URL:</strong> {url}</p>
      <p><strong>Status:</strong> {status}</p>
      {details && (
        <pre style={{ fontSize: '0.8em', backgroundColor: '#f4f4f4', padding: '5px', borderRadius: '5px' }}>
          {JSON.stringify(details, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;