/* global AFRAME */
AFRAME.registerComponent('info-panel', {
  init: function () {
    var buttonEls = document.querySelectorAll('.menu-button');
    var fadeBackgroundEl = this.fadeBackgroundEl = document.querySelector('#fadeBackground');

    this.movieImageEl;
    this.movieTitleEl = document.querySelector('#movieTitle');
    this.movieDescriptionEl = document.querySelector('#movieDescription');

    this.movieInfo = {
      guardaChuvaButton: {
        title: 'Eu e meu guarda-chuva (2010 )',
        imgEl: document.querySelector('#guardaChuvaMovieImage'),
        description: 'Como todo garoto de 11 anos, Eugenio e um sonhador que adora viver grandes aventuras. Sempre andando com o guarda-chuva que herdou de seu falecido avo, o menino esta sempre ao lado de seus melhores amigos, Cebola e Frida. No ultimo dia de ferias, os tres resolvem viver um desafio assustador: ir a escola para conferir se o fantasma do Barao von Staffen realmente existe.'
      },
      medusaButton: {
        title: 'Medusa (2021)',
        imgEl: document.querySelector('#medusaMovieImage'),
        description: 'Uma gangue de jovens mulheres tenta controlar tudo ao seu redor, incluindo outras mulheres, perambulando pelas ruas e espancando aquelas que consideram muito pecaminosas. Para resistir à tentação, Mariana e suas namoradas fazem o melhor que podem para controlar tudo e todos ao seu redor. Entretanto, chegará o dia em que a vontade de gritar será mais forte do que nunca.'
      },
    };

    this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
    this.onBackgroundClick = this.onBackgroundClick.bind(this);
    this.backgroundEl = document.querySelector('#background');
    for (var i = 0; i < buttonEls.length; ++i) {
      buttonEls[i].addEventListener('click', this.onMenuButtonClick);
    }
    this.backgroundEl.addEventListener('click', this.onBackgroundClick);
    this.el.object3D.renderOrder = 9999999;
    this.el.object3D.depthTest = false;
    fadeBackgroundEl.object3D.renderOrder = 9;
    fadeBackgroundEl.getObject3D('mesh').material.depthTest = false;
  },

  onMenuButtonClick: function (evt) {
    var movieInfo = this.movieInfo[evt.currentTarget.id];

    this.backgroundEl.object3D.scale.set(1, 1, 1);

    this.el.object3D.scale.set(1, 1, 1);
    if (AFRAME.utils.device.isMobile()) { this.el.object3D.scale.set(1.4, 1.4, 1.4); }
    this.el.object3D.visible = true;
    this.fadeBackgroundEl.object3D.visible = true;

    if (this.movieImageEl) { this.movieImageEl.object3D.visible = false; }
    this.movieImageEl = movieInfo.imgEl;
    this.movieImageEl.object3D.visible = true;

    this.movieTitleEl.setAttribute('text', 'value', movieInfo.title);
    this.movieDescriptionEl.setAttribute('text', 'value', movieInfo.description);
  },

  onBackgroundClick: function (evt) {
    this.backgroundEl.object3D.scale.set(0.001, 0.001, 0.001);
    this.el.object3D.scale.set(0.001, 0.001, 0.001);
    this.el.object3D.visible = false;
    this.fadeBackgroundEl.object3D.visible = false;
  }
});