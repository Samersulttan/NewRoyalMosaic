const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

router.get('/catalog', (req, res) => {
  const filePath = path.join(__dirname, '../uploads/catalog/catalog.pdf');
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      status: 'error',
      message: 'الكتالوج غير متوفر حالياً'
    });
  }

  // Set headers
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=royal-mosaic-catalog.pdf');

  // Create read stream and pipe to response
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);

  // Handle errors
  fileStream.on('error', (error) => {
    console.error('Error streaming file:', error);
    res.status(500).json({
      status: 'error',
      message: 'حدث خطأ أثناء تحميل الكتالوج'
    });
  });
});

module.exports = router;