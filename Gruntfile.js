module.exports = function(grunt) {

  grunt.config.init({
    eslint: {
      nodeFiles: {
        src: ['src/**/*.js'],
        options: {
          configFile: 'conf/eslint.json'
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    }
  });

  grunt.loadNpmTasks('gruntify-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.registerTask('default', ['eslint','mochaTest']);

}
