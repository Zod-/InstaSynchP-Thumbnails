function Thumbnails() {
  'use strict';
  this.version = '@VERSION@';
  this.name = 'InstaSynchP Thumbnails';
  this.styles = [{
    name: 'core',
    url: '@RAWGITREPO@/@THUMBNAILSCSSREV@/dist/thumbnails.css',
    autoload: true
  }];
}

Thumbnails.prototype.executeOnce = function () {
  'use strict';
};

window.plugins = window.plugins || {};
window.plugins.thumbnails = new Thumbnails();
