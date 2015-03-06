var path = require('path');
/**
 * Create npm object for options
 */
module.exports = function (shipit) {
  shipit.currentPath = path.join(shipit.config.deployTo, 'current');
  shipit.config.npm = shipit.config.npm || {};
  shipit.config.npm.remote = shipit.config.npm.remote || true;
  shipit.config.npm.installArgs = shipit.config.npm.installArgs || [];
  shipit.config.npm.installFlags = shipit.config.npm.installFlags || [];
  //shipit.config.npm.installOn = shipit.config.npm.installOn || 'updated';
  return shipit;
};
