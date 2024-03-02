/* global AFRAME */
AFRAME.registerComponent('info-panel', {
  init: function () {
    var buttonEls = document.querySelectorAll('.menu-button');
    var fadeBackgroundEl = this.fadeBackgroundEl = document.querySelector('#fadeBackground');

    this.movieImageEl;
    this.movieTitleEl = document.querySelector('#movieTitle');
    this.movieDescriptionEl = document.querySelector('#movieDescription');

    this.movieInfo = {
      bacurauButton: {
        title: 'Bacurau (2019)',
        imgEl: document.querySelector('#bacurauMovieImage'),
        description: 'Os moradores de Bacurau, descobrem que a comunidade nao consta mais em qualquer mapa. Aos poucos, eles percebem algo estranho na regiao: enquanto drones passeiam pelos ceus, estrangeiros chegam a cidade. Quando carros são baleados e cadaveres comecam a aparecer, Teresa, Domingas, Acacio, Plinio, Lunga e outros habitantes chegam a conclusao de que estao sendo atacados.'
      },
      tropaDeEliteButton: {
        title: 'Tropa de elite (2010)',
        imgEl: document.querySelector('#tropaDeEliteMovieImage'),
        description: 'Depois de uma operacao fracassada, Nascimento e afastado do Bope e agora trabalha como subsecretario de Inteligencia na Secretaria de Seguranca Publica do Rio de Janeiro. No novo cargo, o ex-capitao e arrastado para uma disputa politica sangrenta que envolve funcionarios do governo e grupos paramilitares.'
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