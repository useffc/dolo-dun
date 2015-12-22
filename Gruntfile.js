module.exports = function(grunt) {
  grunt.initConfig({
    global: {
      root: './',
      img: 'img',
      styles: 'stylesheets',
      app: 'app/',
      assets: 'public/assets',
      modules: 'node_modules'
    },
    copy: {
      vendor : {
        expand: true,
        flatten: true,
        src: [
          '<%= global.modules %>/angular/angular.js',
          '<%= global.modules %>/angular-animate/angular-animate.js'
        ],
        dest: '<%= global.assets %>/js/vendor/'
       }
    },
    concat: {
      options: {
        separator: ';'
      },
      angularApp: {
        src: [
          '<%= global.app %>/app.js',
          '<%= global.app %>/controllers/MainController.js',
          '<%= global.app %>/directives/directive.js',
          '<%= global.app %>/services/MainService.js',
        ],
        dest: '<%= global.assets %>/js/app.js'
      },
      general: {
        src: [
          '<%= global.app %>/main.js',
          '<%= global.modules %>/snapsvg/dist/snap.svg.js'
        ],
        dest: '<%= global.assets %>/js/main.js'
      }
    },
    compass: {
      custom: {
        options: {
          sassDir: '<%= global.styles %>',
          specify: '<%= global.styles %>/main.scss',
          cssDir: '<%= global.assets %>/css',
          environment: 'development',
          noLineComments: true
        }
      }
    },
    //watch should watch for changes in scss files or front end js and recompile when that happens
    watch: {
      customCss: {
        files: [
          '<%= global.styles %>/main.scss',
          '<%= global.styles %>/main/**/*.scss',
        ],
        tasks: ['compass:custom']
      },
      js: {
        files: '<%= global.app %>/**/*.js',
        tasks: ['concat:angularApp']
      },
      static: {
        files: '<%= global.app %>/main.js',
        tasks: ['copy:general']
      }
    },
    nodemon: {
      dev: {
        script: 'dolo.js'
      }
    },
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'watch']
    }
  });
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['copy', 'concat', 'compass:custom', 'concurrent']);
};
