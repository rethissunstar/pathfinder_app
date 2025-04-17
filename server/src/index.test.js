// const mockFs = require('mock-fs');
// const express = require('express');
// const path = require('path');

// describe('loadRoutes()', () => {
//   afterEach(() => {
//     mockFs.restore();
//     jest.resetModules();
//   });

//   it('should mount routes from folders that contain a matching .routes.js file', () => {
//     const app = { use: jest.fn() };

//     // 🧱 Setup mocked file system
//     mockFs({
//       [path.resolve(__dirname, 'users')]: {
//         'Users.routes.js': 'module.exports = (req, res) => res.send("users route");',
//       },
//       [path.resolve(__dirname, 'index.js')]: `
//         const fs = require('fs');
//         const path = require('path');
//         function loadRoutes(app) {
//           const domainsPath = path.join(__dirname);
//           const folders = fs.readdirSync(domainsPath);
//           folders.forEach((folder) => {
//             const routeFile = folder.charAt(0).toUpperCase() + folder.slice(1) + '.routes.js';
//             const routePath = path.join(domainsPath, folder, routeFile);
//             if (fs.existsSync(routePath)) {
//               const routes = require(routePath);
//               app.use(\`/api/\${folder}\`, routes);
//             }
//           });
//         }
//         module.exports = { loadRoutes };
//       `
//     });

//     // 🧪 Isolate module to load after fs is mocked
//     jest.isolateModules(() => {
//       const { loadRoutes } = require('./index'); // Now it exists in mocked FS
//       loadRoutes(app);
//     });

//     expect(app.use).toHaveBeenCalledWith('/api/users', expect.any(Function));
//   });
// });
const fs = require('fs');
const path = require('path');
const express = require('express');
const { loadRoutes } = require('./index');

const mockRoot = path.join(__dirname, '__tests__', 'mocks');
const mockUsersDir = path.join(mockRoot, 'users');
const mockRoutesFile = path.join(mockUsersDir, 'Users.routes.js');

describe('loadRoutes()', () => {
  let app;

  beforeAll(() => {
    // Create mock users directory and mock route file with simple export
    fs.mkdirSync(mockUsersDir, { recursive: true });
    fs.writeFileSync(
      mockRoutesFile,
      `module.exports = (req, res, next) => next();`
    );
  });

  afterAll(() => {
    // Remove mocks folder
    fs.rmSync(mockRoot, { recursive: true, force: true });
  });

  it('should mount /api/users if Users.routes.js exists', () => {
    app = { use: jest.fn() };

    // Temporarily override __dirname resolution in index.js
    const originalJoin = path.join;
    jest.spyOn(path, 'join').mockImplementation((...args) => {
      const joined = originalJoin(...args);
      return joined.includes(__dirname)
        ? joined.replace(/src$/, 'src/__tests__/mocks')
        : joined;
    });

    const { loadRoutes } = require('./index');
    loadRoutes(app);

    expect(app.use).toHaveBeenCalledWith('/api/users', expect.any(Function));

    jest.restoreAllMocks();
  });
});
