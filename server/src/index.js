const fs = require('fs');
const path = require('path');

function loadRoutes(app) {
  const domainsPath = path.join(__dirname);
  const folders = fs.readdirSync(domainsPath);

  folders.forEach((folder) => {
    const routeFile = `${capitalize(folder)}.routes.js`;
    const routePath = path.join(domainsPath, folder, routeFile);

    if (fs.existsSync(routePath)) {
      const routes = require(routePath);
      app.use(`/api/${folder}`, routes);
      console.log(`🔗 Mounted /api/${folder}`);
    }
  });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = { loadRoutes };
