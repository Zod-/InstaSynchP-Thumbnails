module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    'string-replace': {
      build: {
        files: {
          'dist/': 'dist/*.js',
        },
        options: {
          replacements: [{
            pattern: /@VERSION@/g,
            replacement: '<%= pkg.version %>'
          }, {
            pattern: /@THUMBNAILSCSSREV@/g,
            replacement: function () {
              var cssrev = grunt.file.read('dist/thumbnailsCSSrev')
                .trim();
              grunt.file.delete('dist/thumbnailsCSSrev');
              return cssrev;
            }
          }, {
            pattern: /@RAWGITREPO@/g,
            replacement: 'https://cdn.rawgit.com/Zod-/InstaSynchP-Thumbnails'
          }, {
            pattern: /\/\/ @name[^\n]*\n/g,
            replacement: function (match) {
              return match.replace(/-/, ' ');
            }
          }]
        }
      }
    },
    copy: {
      dist: {
        flatten: true,
        expand: true,
        src: ['src/thumbnails.css'],
        dest: 'dist/',
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
      },
      beforereplace: ['src/thumbnails.js'],
      other: ['Gruntfile.js']
    },
    concat: {
      dist: {
        src: ['tmp/meta.js', 'src/thumbnails.js'],
        dest: 'dist/InstaSynchP-Thumbnails.user.js'
      }
    },
    'userscript-meta': {
      build: {
        dest: 'tmp/meta.js'
      }
    },
    shell: {
      gitlog: {
        command: 'git log -n 1 --pretty="%H" dist/thumbnails.css',
        options: {
          callback: function log(err, stdout, stderr, cb) {
            grunt.file.write('dist/thumbnailsCSSrev', stdout);
            cb();
          }
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-userscript-meta');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('build-css', ['copy']);
  grunt.registerTask('build-js', ['shell', 'userscript-meta', 'concat',
    'string-replace'
  ]);
  grunt.registerTask('build', ['build-css', 'build-js']);
  grunt.registerTask('default', ['build', 'test']);
};
