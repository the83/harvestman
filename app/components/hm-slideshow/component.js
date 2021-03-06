import Ember from 'ember';

export default Ember.Component.extend({
  uiSetup: function() {
    this._initSlider();
  }.on('didRender'),

  _initSlider: function() {
    let slider = Ember.$('.slider');
    if(slider.find('img').attr('src').match(/data/)) { return; }

    // for some reason reinitializing the slider doesn't GC the indicators
    Ember.$('.indicators').remove();
    slider.slider({
      height: 300,
      indicators: false
    });
  }
});
