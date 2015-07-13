var utils = require('shipit-utils');
var path = require('path');
/**
 * Init task.
 * - Emit npm_inited event.
 */

module.exports = function (gruntOrShipit) {
  utils.registerTask(gruntOrShipit, 'npm:init', task);

  function task() {
    var shipit = utils.getShipit(gruntOrShipit);

    shipit.config = shipit.config || {};
    shipit.currentPath = shipit.config.deployTo ? path.join(shipit.config.deployTo, 'current') : undefined;
    shipit.config.npm = shipit.config.npm || {};
    shipit.config.npm.remote = shipit.config.npm.remote !== false;
    shipit.config.npm.installArgs = shipit.config.npm.installArgs || [];
    shipit.config.npm.installFlags = shipit.config.npm.installFlags || [];
    shipit.config.npm.preinstall = shipit.config.npm.preinstall || false;

    var triggerEvent = shipit.config.npm.remote ? 'updated' : 'fetched';
    shipit.config.npm.triggerEvent = shipit.config.npm.triggerEvent !== undefined ? shipit.config.npm.triggerEvent : onEvent;

    shipit.npm_inited = true;
    shipit.emit('npm_inited');
  }
};
