module.exports = function(grunt) {
  grunt.initConfig({
    global: {
      root: './',
      dist: 'dist',
      distAssets: 'dist/assets',
      src: 'src',
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
          //jquery
          {
            expand: true,
            flatten: true,
            src: 'node_modules/jquery/dist/jquery.js',
            dest: '<%= global.distAssets %>/js'
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
          cssDir: '<%= global.distAssets %>/css',
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
          '<%= global.styles %>/custom/**/*.scss',
        ],
        tasks: ['compass:custom']
      },
      markup: {
        files: '<%= global.templates %>/**/*.hbs',
        tasks: ['assemble']
      },
      js: {
        files: '<%= global.js %>/**/*.js',
        tasks: ['copy:custom']
      },
    }
  });
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('assemble');

  grunt.registerTask('default', ['copy', 'concat', 'compass:everything', 'assemble', 'connect', 'watch']);
};
