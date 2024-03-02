/* global AFRAME */
AFRAME.registerComponent('info-panel', {
  init: function () {
    var buttonEls = document.querySelectorAll('.menu-button');
    var fadeBackgroundEl = this.fadeBackgroundEl = document.querySelector('#fadeBackground');

    this.movieImageEl;
    this.movieTitleEl = document.querySelector('#movieTitle');
    this.movieDescriptionEl = document.querySelector('#movieDescription');

    this.movieInfo = {
      medusaButton: {
        title: 'Medusa (2021)',
        imgEl: document.querySelector('#medusaMovieImage'),
        description: 'Uma gangue de jovens mulheres tenta controlar tudo ao seu redor, incluindo outras mulheres, perambulando pelas ruas e espancando aquelas que consideram muito pecaminosas. Para resistir à tentação, Mariana e suas namoradas fazem o melhor que podem para controlar tudo e todos ao seu redor. Entretanto, chegará o dia em que a vontade de gritar será mais forte do que nunca.'
      },
      mortonaofalaButton: {
        title: 'Morto nao fala (2018)',
        imgEl: document.querySelector('#mortonaofalaMovieImage'),
        description: 'Stenio é plantonista noturno no necroterio de uma grande e violenta cidade. Em suas madrugadas de trabalho, ele nunca esta so, ja que possui um dom paranormal de comunicacao com os mortos. Quando as confidencias que ouve do alem revelam segredos de sua propria vida, Stenio desencadeia uma maldicao que traz perigo e morte para perto de si e de sua familia.'
      },
      bacurauButton: {
        title: 'Bacurau (2019)',
        imgEl: document.querySelector('#bacurauMovieImage'),
        description: 'Os moradores de Bacurau, descobrem que a comunidade não consta mais em qualquer mapa. Aos poucos, eles percebem algo estranho na região: enquanto drones passeiam pelos céus, estrangeiros chegam à cidade. Quando carros são baleados e cadáveres começam a aparecer, Teresa, Domingas, Acácio, Plínio, Lunga e outros habitantes chegam à conclusão de que estão sendo atacados.'
      },
      palhacoButton: {
        title: 'Palhaco (2011)',
        imgEl: document.querySelector('#palhacoMovieImage'),
        description: 'Benjamim e seu pai, Valdemar, formam a divertida dupla de palhaços Pangaré e Puro Sangue. Os dois trabalham em um circo mambembe, mas Benjamin decide abandonar a vida artística e mergulhar em uma nova aventura para realizar um grande sonho.'
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