var path = require('path');
/**
 * Create npm object for options
 */
module.exports = function (shipit) {
  shipit.config = shipit.config || {};
  shipit.currentPath = shipit.config.deployTo ? path.join(shipit.config.deployTo, 'current') : undefined;
  shipit.config.npm = shipit.config.npm || {};
  shipit.config.npm.remote = shipit.config.npm.remote !== false;
  shipit.config.npm.installArgs = shipit.config.npm.installArgs || [];
  shipit.config.npm.installFlags = shipit.config.npm.installFlags || [];
  return shipit;
};
