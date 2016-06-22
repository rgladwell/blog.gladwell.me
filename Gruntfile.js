module.exports = function (grunt) {
  'use strict';

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
        tasks: ['shell:metalsmith']
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

    html5validate: {
      src: 'dist/*.html'
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

  grunt.registerTask('default', ['shell:metalsmith', 'copy', 'sass', 'cssmin', 'imagemin', 'npmcopy']);
  grunt.registerTask('deploy', ['clean', 'default', 'buildcontrol']);
  grunt.registerTask('run', ['default', 'connect', 'watch']);
};
