const express = require('express');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

const app = express();
const port = process.env.PORT || 3000;

// Define paths
const viewsDir = path.join(__dirname, 'views');
const publicDir = path.join(__dirname, 'public');
const outputDir = path.join(publicDir, 'generated'); 


if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Set EJS as view engine
app.set('view engine', 'ejs');

// Define route for generating the static HTML
app.get('/', (req, res) => {
  ejs.renderFile(path.join(viewsDir, 'index.ejs'), { title: 'My Portfolio' }, (err, str) => {
    if (err) {
      console.error('Error rendering template:', err);
      res.status(500).send('Error generating page.');
    } else {
      // Write the rendered HTML to the output directory
      fs.writeFileSync(path.join(outputDir, 'index.html'), str);
      res.send('Static HTML generated in public/generated/index.html');
    }
  });
});

// Static file serving (CSS, JS, images)
app.use(express.static(publicDir));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
