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
    assemble: {
      options: {
        layoutdir: 'src/templates/layouts/',
        layout: 'landing.hbs',
        assets: 'dist/assets',
        partials: 'src/templates/partials/**/*.hbs'
      },
      target: {
        files: [
          {
            expand: true,
            cwd: 'src/templates/pages',
            src: ['**/*.hbs'],
            dest: '<%= global.dist %>'
          }
        ]
      }
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
          {
            expand: true,
            flatten: true,
            cwd: 'src/js/vendor',
            src: '*.js',
            dest: '<%= global.distAssets %>/js'
          }
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
      },
      foundation: {
        src: [
          '<%= global.js %>/foundation/foundation.js',
          '<%= global.js %>/foundation/foundation.alerts.js',
          '<%= global.js %>/foundation/foundation.clearing.js',
          '<%= global.js %>/foundation/foundation.cookie.js',
          '<%= global.js %>/foundation/foundation.dropdown.js',
          '<%= global.js %>/foundation/foundation.forms.js',
          '<%= global.js %>/foundation/foundation.joyride.js',
          '<%= global.js %>/foundation/foundation.magellan.js',
          '<%= global.js %>/foundation/foundation.orbit.js',
          '<%= global.js %>/foundation/foundation.placeholder.js',
          '<%= global.js %>/foundation/foundation.reveal.js',
          '<%= global.js %>/foundation/foundation.section.js',
          '<%= global.js %>/foundation/foundation.tooltip.js',
          '<%= global.js %>/foundation/foundation.topbar.js',
          '<%= global.js %>/foundation/foundation.interchange.js',
          '<%= global.js %>/foundation/foundation.offcanvas.js'
        ],
        dest: '<%= global.distAssets %>/js/foundation.js'
      }
    },
    compass: {
      everything: {
        options: {
          sassDir: '<%= global.styles %>',
          cssDir: '<%= global.distAssets %>/css',
          specify: [
            '<%= global.styles %>/foundation.scss',
            '<%= global.styles %>/ionicons.scss',
            '<%= global.styles %>/main.scss',
            '<%= global.styles %>/normalize.scss',
          ],
          environment: 'development',
          noLineComments: true
        }
      },
      foundation: {
        options: {
          sassDir: '<%= global.styles %>',
          specify: '<%= global.styles %>/foundation.scss',
          cssDir: '<%= global.distAssets %>/css',
          environment: 'development',
          noLineComments: true
        }
      },
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
    watch: {
      foundationCss: {
        files: [
          '<%=global.styles %>/foundation.scss',
          '<%= global.styles %>/foundation/**/*.scss'
        ],
        tasks: ['compass:foundation']
      },
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
