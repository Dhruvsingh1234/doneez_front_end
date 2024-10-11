module.exports = {
  apps: [
    {
      name: 'doneez',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
