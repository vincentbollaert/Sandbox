module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['jasmine'],
    files: [
      'scripts/directives/pg-slider.js',
      'scripts/directives/pg-slider.spec.js'
    ]
  });
};
