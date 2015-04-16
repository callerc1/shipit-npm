var utils = require('shipit-utils');

/**
 * Preinstall task.
 * - Emits npm_preinstall event.
 */

module.exports = function (gruntOrShipit) {
  utils.registerTask(gruntOrShipit, 'npm:preinstall', task);

  function task() {
    var shipit = utils.getShipit(gruntOrShipit);
    shipit.emit('npm_preinstall');
  }
};
