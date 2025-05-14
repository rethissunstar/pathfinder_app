

const fs = require("fs");
const path = require("path");

function loadRoutes(app) {
  const domainsPath = path.join(__dirname);

  const folders = fs
    .readdirSync(domainsPath)
    .filter((name) =>
      fs.statSync(path.join(domainsPath, name)).isDirectory()
    );

  folders.forEach((folder) => {
    const folderPath = path.join(domainsPath, folder);
    const indexPath = path.join(folderPath, "index.js");

    console.log(`📁 Checking folder: ${folder}`);

    if (fs.existsSync(indexPath)) {
      const exportedRoutes = require(indexPath);

      Object.entries(exportedRoutes).forEach(([key, router]) => {
        if (typeof router === "function") {
          const routePath = `/api/${folder}`;
          app.use(routePath, router);
          console.log(`🔗 Mounted ${key} at ${routePath}`);
        } else {
          console.warn(`⚠️  Skipped non-router export in ${folder}/index.js: ${key}`);
        }
      });
    } else {
      console.warn(`⚠️  No index.js in folder: ${folder}`);
    }
  });
}

module.exports = { loadRoutes };
