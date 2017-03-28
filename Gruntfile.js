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
          reporter: 'spec',
          timeout: 120000
        },
        src: ['test/**/*.js']
      }
    }
  });

  grunt.loadNpmTasks('gruntify-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.registerTask('test', ['eslint','mochaTest']);
  grunt.registerTask('default', ['test']);

}
