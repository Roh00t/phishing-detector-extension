const express = require('express');
const { submitUrl, getAnalysisReport, getUrlReport } = require('../model/classifier');

const router = express.Router();

router.post('/', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const analysisId = await submitUrl(url);
    const analysisReport = await getAnalysisReport(analysisId);
    const urlReport = await getUrlReport(url);

    res.json({
      analysis: analysisReport,
      report: urlReport,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error processing URL' });
  }
});

module.exports = router;