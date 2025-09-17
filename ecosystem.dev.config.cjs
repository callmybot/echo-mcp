module.exports = {
  apps: [
    {
      autorestart: false,
      script: 'src/main.mjs',
      watch: ['src/', 'package-lock.json'],
    },
  ],
}
