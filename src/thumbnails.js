function Thumbnails() {
  'use strict';
  this.version = '@VERSION@';
  this.name = 'InstaSynchP Thumbnails';
  this.styles = [{
    name: 'thumbnails',
    url: '@RAWGITREPO@/@THUMBNAILSCSSREV@/dist/thumbnails.css',
    autoload: true
  }];
  //TODO add setting to hide thumbnails
}

Thumbnails.prototype.onAddVideo = function (video) {
  'use strict';
  var videoIndex = window.room.playlist.indexOf(video.info) + 1;
  var $video = $('#playlist > li:nth-child({0})'.format(videoIndex));
  var $thumbnail = $('<a>', {
    href: urlParser.create({
      videoInfo: video.info
    }),
    target: '_blank'
  }).append(
    $('<img>', {
      src: video.info.thumbnail,
      class: 'video-thumbnail'
    })
  );

  $video.find('.title').before($thumbnail);
};

Thumbnails.prototype.executeOnce = function () {
  'use strict';

  var _this = this;
  events.on(_this, 'AddVideo', _this.onAddVideo);
};

window.plugins = window.plugins || {};
window.plugins.thumbnails = new Thumbnails();
