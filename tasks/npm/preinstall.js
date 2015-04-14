var utils = require('shipit-utils');

/**
 * Init task.
 * - Emit deploy event.
 */

module.exports = function (gruntOrShipit) {
  utils.registerTask(gruntOrShipit, 'npm:preinstall', task);

  function task() {
    var shipit = utils.getShipit(gruntOrShipit);
    shipit.emit('npm_preinstall');
  }
};
