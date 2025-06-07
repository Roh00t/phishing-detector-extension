import { useState } from 'react';
import './popup.css';

function Popup() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const classifyUrl = async () => {
    setError(null);
    setResult(null);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/classify-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch analysis: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Unexpected error during classification.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-container">
      <h3 className="popup-title">Phishing Detector</h3>

      <input
        type="text"
        className="popup-input"
        placeholder="Enter URL to check"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        className="popup-button"
        onClick={classifyUrl}
        disabled={loading || !url.trim()}
      >
        {loading ? 'Checking...' : 'Check URL'}
      </button>

      {error && <p className="popup-error">{error}</p>}

      {result && (
        <div className="popup-resultBox">
          <p><strong>Status:</strong> {result.analysis?.attributes?.status || 'N/A'}</p>
          <p><strong>Malicious:</strong> {result.report?.attributes?.last_analysis_stats?.malicious ?? 'N/A'}</p>
          <p><strong>Harmless:</strong> {result.report?.attributes?.last_analysis_stats?.harmless ?? 'N/A'}</p>
          <p><strong>Undetected:</strong> {result.report?.attributes?.last_analysis_stats?.undetected ?? 'N/A'}</p>
          <p><strong>Reputation Score:</strong> {result.report?.attributes?.reputation ?? 'N/A'}</p>

          {result.report?.id && (
            <a
              href={`https://www.virustotal.com/gui/url/${result.report.id}`}
              className="popup-link"
              target="_blank"
              rel="noreferrer"
            >
              View full VirusTotal report →
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default Popup;