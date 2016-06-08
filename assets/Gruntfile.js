module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        babel: {
            options: {
                sourceMap: true,
                presets: ['babel-preset-es2015']
            },
            dist: {
                files: {
                    'js/es6.js': ['js/script.es6']
                }
            }
        },
        browserify: {
            dist: {
                options: {
                    transform: ["babelify"]
                },
                files: {
                    'js/app-modules.js': ['js/es6.js']
                }
            }
        },
        jshint: {
            options: {
                browser: true,
                globals: {
                    jQuery: true
                }
            },
            all: {
                files: {
                    src: ['js/app-modules.js']
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    compass: true
                },
                files: {
                    'css/style.css': 'sass/style.scss'
                }
            }
        },
        cssmin: {
            compressScreen: {
                files: {
                    'css/style.min.css': ['css/style.css']
                }
            },
            compressPrint: {
                files: {
                    'css/print.min.css': ['css/print.css']
                }
            },
            compressVendors: {
                files: {
                    'css/vendors.min.css': [
                        'bower_components/fancybox/source/jquery.fancybox.css',
                        'bower_components/fancybox/source/helpers/jquery.fancybox-thumbs.css'
                    ]
                }
            }
        },
        concat: {
            options: {
            },
            js: {
                src: [
                    'bower_components/modernizr/modernizr.js',
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/bootstrap/dist/js/bootstrap.js',
                    'bower_components/bootstrap-select/js/bootstrap-select.js',
                    'bower_components/momentjs/min/moment.min.js',
                    'bower_components/webfontloader/webfontloader.js',
                    'bower_components/retina.js/dist/retina.js'
                    ],
                dest: 'js/vendors.js'
            },
            app: {
                src: ['js/vendors.js'],
                dest: 'js/app-0.1.0.js'
            },
            css: {
                src: ['css/vendors.min.css','css/style.min.css'],
                dest: 'css/style-0.1.0.min.css'
            },
            print: {
                src: ['css/print.min.css'],
                dest: 'css/print-0.1.0.min.css'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> v<%= pkg.version %>, <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            appJs: {
                src: ['js/app-0.1.0.js'],
                dest: 'js/app-0.1.0.min.js'
            }
        },
        versioning: {
            options: {
                grepFiles: [
                    '../views/pages/index.ejs'
                ],
                keepOriginal: false
            },
            js: {
                src: [
                    'js/vendors-*.min.js',
                    'js/app-*.min.js'
                ]
            },
            css: {
                src: [
                    'css/style*.min.css',
                ]
            }
        },
        watch: {
            scripts: {
                files: ['js/**/*.js'],
                tasks: ['jshint','concat','uglify'],
                options: {
                    debounceDelay: 2400
                }
            },
            sass: {
                files: 'sass/**/*.scss',
                tasks: ['sass','cssmin','concat'],
                options: {
                    debounceDelay: 2400
                }
            }
        },
        cachebreaker: {
            dev: {
                options: {
                    match: [
                        'css/vendors-0.1.0.min.css',
                        'css/style-0.1.0.min.css',
                        'css/print-0.1.0.min.css',
                        'js/app-0.1.0.js',
                        'js/app-modules.js'
                    ]
                },
                files: {
                    src: [
                        '../index.html'
                    ]
                }
            }
        }
    });

    //Load tasks from specified plugins installed via npm
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-cache-breaker');

    //Task Lists
    grunt.registerTask('default', ['sass','cssmin','concat','uglify','watch']);
    grunt.registerTask('js', ['babel','browserify','concat','uglify','cachebreaker']);
    grunt.registerTask('css', ['sass','cssmin','concat','uglify','cachebreaker']);
};