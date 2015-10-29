module.exports = function(grunt) {
  grunt.initConfig({
    global: {
      root: './',
      dist: 'dist',
      assets: 'public/assets',
      img: 'img',
      styles: 'stylesheets',
      js: 'src/js'
    },
    copy: {
      dist:{
        files: [
          // ion icons
          {
            expand: true,
            cwd: '<%= global.fonts %>/ionicons',
            src: '**',
            dest: '<%= global.distAssets %>/fonts'
          },
          //images
          {
            expand: true,
            cwd: 'src/img',
            src: '**',
            dest: '<%= global.distAssets %>/img'
          },
          //vendor libraries that aren't in node modules
         ]
       },
       custom: {
        files: [
          //other libraries/js written by me
          {
            expand: true,
            flatten: true,
            cwd: '<%= global.js %>',
            src: [
              'main.js'
            ],
            dest: '<%= global.distAssets %>/js'
          }
        ]
       }
    },
    concat: {
      options: {
        separator: ';'
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
        files: '<%= global.js %>/**/*.js',
        tasks: ['copy:custom']
      },
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
