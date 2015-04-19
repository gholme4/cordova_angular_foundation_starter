module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			options: {
		       // If you can't get source maps to work, run the following command in your terminal:
		       // $ sass scss/foundation.scss:css/foundation.css --sourcemap
		       // (see this link for details: http://thesassway.com/intermediate/using-source-maps-with-sass )
		       
   			},

			dist: {
				options: {
					// outputStyle: 'compressed',
					outputStyle: 'expanded'
				},
				files: {
					'www/css/style.css': 'client/scss/app.scss'
				}
			}
		},

		copy: {
			scripts: {
				expand: true,
				cwd: 'bower_components/foundation/js/vendor/',
				src: '**',
				flatten: 'true',
				dest: 'www/js/vendor/'
			}

		},

		concat: {
			options: {
				separator: ';',
			},
			dist: {
				src: [
				// jquery
				'client/bower_components/jquery/dist/jquery.js',

				// Foundation core
		         'client/bower_components/foundation/js/foundation/foundation.js',

		         // Angular
		         'client/bower_components/angular/angular.js',
		         'client/bower_components/angular-ui-router/release/angular-ui-router.min.js',

		         // Pick the componenets you need in your project
		         'client/bower_components/foundation/js/foundation/foundation.abide.js',
		         'client/bower_components/foundation/js/foundation/foundation.accordion.js',
		         'client/bower_components/foundation/js/foundation/foundation.alert.js',
		         'client/bower_components/foundation/js/foundation/foundation.clearing.js',
		         'client/bower_components/foundation/js/foundation/foundation.dropdown.js',
		         'client/bower_components/foundation/js/foundation/foundation.equalizer.js',
		         'client/bower_components/foundation/js/foundation/foundation.interchange.js',
		         'client/bower_components/foundation/js/foundation/foundation.joyride.js',
		         'client/bower_components/foundation/js/foundation/foundation.magellan.js',
		         'client/bower_components/foundation/js/foundation/foundation.offcanvas.js',
		         'client/bower_components/foundation/js/foundation/foundation.orbit.js',
		         'client/bower_components/foundation/js/foundation/foundation.reveal.js',
		         'client/bower_components/foundation/js/foundation/foundation.slider.js',
		         'client/bower_components/foundation/js/foundation/foundation.tab.js',
		         'client/bower_components/foundation/js/foundation/foundation.tooltip.js',
		         'client/bower_components/foundation/js/foundation/foundation.topbar.js',

		         // Include your own custom scripts (located in the custom folder)
		         'client/js/index.js',
		         'client/js/app.js'

		         ],
		         // Finally, concatinate all the files above into one single file
		         dest: 'www/js/script.js',
		     },
		 },

		 uglify: {
		 	dist: {
		 		files: {
		         // Shrink the file size by removing spaces
		         'www/js/script.js': ['www/js/script.js']
		     }
		 }
		},

		connect: {
			server: {
				options: {
					port: 1337,
					base: 'www',
					keepalive: true
				}
			}
		},

		watch: {
			grunt: { files: ['Gruntfile.js'] 

			},

			sass: {
				files: 'client/scss/**/*.scss',
				tasks: ['sass']
			},
			js: {
				files: 'client/js/*.js',
				tasks: ['concat'/*, 'uglify'*/]
			}
		}
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-string-replace');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('build', ['copy', 'sass', 'concat'/*, 'uglify'*/]);
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('server', ['connect']);
};