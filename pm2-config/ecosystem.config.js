module.exports = {
  apps: [
    {
      name: "ncm-frontend",
      script: "npm",
      args: "run dev",
      cwd: "/home/tfg/Neighborhood-Community/vue-front",
      watch: true,
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    },
    {
      name: "ncm-backend",
      script: "node",
      args: "index.js",
      cwd: "/home/tfg/Neighborhood-Community/node-back",
      watch: true,
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
