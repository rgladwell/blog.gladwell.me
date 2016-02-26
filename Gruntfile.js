module.exports = function (grunt) {
  'use strict';

  var stylelintConfig = {
    "rules": {
      "block-no-empty": true,
      "color-no-invalid-hex": true,
      "declaration-colon-space-after": "always",
      "declaration-colon-space-before": "never",
      "function-comma-space-after": "always",
      "function-url-quotes": "double",
      "media-feature-colon-space-after": "always",
      "media-feature-colon-space-before": "never",
      "media-feature-name-no-vendor-prefix": true,
      "max-empty-lines": 5,
      "number-leading-zero": "never",
      "number-no-trailing-zeros": true,
      "property-no-vendor-prefix": true,
      "rule-no-duplicate-properties": true,
      "declaration-block-no-single-line": true,
      "rule-trailing-semicolon": "always",
      "selector-list-comma-space-before": "never",
      "selector-list-comma-newline-after": "always",
      "selector-no-id": true,
      "string-quotes": "double",
      "value-no-vendor-prefix": true
    }
  }

  grunt.initConfig({
    copy: {
      assets: {
        files: [
          {
            expand: true,
            cwd: 'assets/',
            src: ['**', '!styles/**'],
            dest: 'dist/'
          }
        ],
      }
    },

    watch: {
      options: {
        livereload: true
      },
      metalsmith: {
        files: ['posts/**', 'layouts/**', "metalsmith.json"],
        tasks: ['shell:metalsmith', 'html5-lint']
      },
      sass: {
        files: ['assets/styles/**'],
        tasks: ['postcss', 'sass', 'cssmin']
      },
      assets: {
        files: ['assets/**', '!assets/styles/**'],
        tasks: ['copy:assets', 'imagemin:assets']
      }
    },

    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'dist/main.css': 'assets/styles/main.scss'
        }
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'dist',
          src: ['*.css', '!*.min.css'],
          dest: 'dist',
          ext: '.min.css'
        }]
      }
    },

    imagemin: {
      assets: {
        files: [{
          expand: true,
          cwd: 'dist/images',
          src: ['**/*.{png,jpg,gif,svg, ico}'],
          dest: 'dist/images'
        }]
      }
    },

    clean: {
      release: ["dist"]
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: 'dist',
          hostname: 'localhost',
          livereload: true
        }
      }
    },

    buildcontrol: {
      options: {
        dir: 'dist',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      pages: {
        options: {
          remote: 'git@github.com:rgladwell/blog.gladwell.me.git',
          branch: 'gh-pages'
        }
      }
    },

    shell: {
      metalsmith: {
        command: "metalsmith"
      }
    },

    npmcopy: {
      dist: {
        options: {
          destPrefix: 'dist/vendor'
        },
        files: {
          'styles/font-awesome/': 'font-awesome/fonts'
        }
      }
    },

    postcss: {
      options: {
        processors: [
          require('stylelint')(stylelintConfig)
        ]
      },
      dist: {
        src: 'assets/styles/*.scss'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-build-control');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-npmcopy');
  grunt.loadNpmTasks('grunt-postcss');

  grunt.task.registerTask('html5-lint', 'Analyse HTML5 for errors and common problems.', function() {
    var fs = require( 'fs' ),
        html5Lint = require( 'html5-lint' ),
        glob = require("glob");

    var done = this.async();
    var files = glob.sync("dist/*.html");

    grunt.util.async.forEach(files, function(file, cb) {
      var html = fs.readFileSync(file, 'utf8')
      html5Lint(html, function(err, results) {
        results.messages.forEach(function(msg) {
          grunt.log.error("HTML5 Lint [%s:%s] [%s]: %s", file, msg.lastLine, msg.type, msg.message);
        });
        cb(results.messages.length > 0);
      });
    }, function(error) {
      done(!error);
    });
  });

  grunt.registerTask('default', ['postcss', 'shell:metalsmith', 'html5-lint', 'copy', 'sass', 'cssmin', 'imagemin', 'npmcopy']);
  grunt.registerTask('deploy', ['clean', 'default', 'buildcontrol']);
  grunt.registerTask('run', ['default', 'connect', 'watch']);
};
