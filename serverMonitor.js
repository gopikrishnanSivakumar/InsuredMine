const os = require('os-utils');
const { exec } = require('child_process');

setInterval(() => {
  os.cpuUsage((v) => {
    console.log('CPU Usage (%): ' + v * 100);
    if (v > 0.7) {
      console.log('Restarting server due to high CPU usage');
      exec('pm2 restart server');
    }
  });
}, 10000); // Check every 10 seconds