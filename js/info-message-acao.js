/* global AFRAME */
AFRAME.registerComponent('info-message', {
  schema: {
    htmlSrc: {type: 'selector'},
    startOpened: {default: false},
    width: {default: 400},
    height: {default: 320}
  },
  init: function () {
    var sceneEl = this.el.sceneEl;
    var messageEl = this.messageEl = document.createElement('div');
    var startOpened = this.data.startOpened;
    this.toggleInfoMessage = this.toggleInfoMessage.bind(this);

    messageEl.classList.add('a-info-message');
    messageEl.setAttribute('aframe-injected', '');

    var closeButtonEl = this.closeButtonEl = document.createElement('button');
    closeButtonEl.innerHTML = 'X';
    closeButtonEl.classList.add('a-close-button-info');
    closeButtonEl.onclick = this.toggleInfoMessage;

    this.createInfoButton(this.toggleInfoMessage);

    this.addStyles();
    sceneEl.appendChild(messageEl);

    this.messageEl.style.display = startOpened ? '' : 'none';
    this.infoButton.style.display = startOpened ? 'none' : '';
    messageEl.addEventListener('click', function (evt) { evt.stopPropagation(); });
  },

  update: function () {
    var messageEl = this.messageEl;
    messageEl.innerHTML = this.data.htmlSrc.data;
    messageEl.appendChild(this.closeButtonEl);
  },

  addStyles: function () {
    var css =
      '.a-info-message{border-radius: 10px; position: absolute; width: ' + this.data.width + 'px;' +
      'height: ' + this.data.height + 'px; background-color: white; border: 3px solid rgba(0,0,0,0.65);' +
      'bottom: 22px; left: 22px; color: rgb(51, 51, 51); padding: 20px 15px 0 15px;' +
      'font-size: 11pt; line-height: 20pt; z-index: 9999}' +

      '.a-info-message a{border-bottom: 1px solid rgba(53,196,232,.15); color: #1497b8;' +
      'position: relative; text-decoration: none; transition: .05s ease;}' +

      '@media only screen and (min-width: 1200px) {' +
      '.a-info-message {font-size: 12pt}}' +

      '@media only screen and (max-width: 600px) {' +
      '.a-info-message {left: 20px; right: 20px; bottom: 60px; width: auto}}' +

      '@media only screen and (max-height: 600px) {' +
      '.a-info-message {left: 20px; bottom: 20px; height: 250px}}' +

      '.a-close-button-info{width: 25px; height: 25px; padding: 0;' +
      'top: 10px; right: 10px; position: absolute; color: white;' +
      'font-size: 12px; line-height: 12px; border: none; background-color: #ef2d5e;' +
      'border-radius: 5px; font-weight: medium}' +

      '.a-close-button-info:hover{background-color: #b32146; color: white}' +
      '.a-info-message-container {position: absolute; left: 100px; bottom: 20px;}' +
      '.a-info-message-button {background: rgba(0, 0, 0, 0.35) ' + this.infoMessageButtonDataURI  + ' 50% 50% no-repeat;}' +
      '.a-info-message-button {background-size: 92% 90%; border: 0; bottom: 0; cursor: pointer; min-width: 78px; min-height: 34px; padding-right: 0; padding-top: 0; position: absolute; right: 0; transition: background-color .05s ease; -webkit-transition: background-color .05s ease; z-index: 9999; border-radius: 8px; touch-action: manipulation;}' +
      '.a-info-message-button:active, .a-info-message-button:hover {background-color: #ef2d5e;}';
    var style = document.createElement('style');

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName('head')[0].appendChild(style);
  },

  toggleInfoMessage: function () {
    var display = this.messageEl.style.display;
    this.infoButton.style.display = display;
    display = display === 'none' ? '' : 'none';
    this.messageEl.style.display = display;
    if (display === 'none') {
      this.el.emit('infomessageclosed');
    } else {
      this.el.emit('infomessageopened');
    }
  },

  createInfoButton: function (onClick) {
    var infoButton;
    var wrapper;

    // Create elements.
    wrapper = document.createElement('div');
    wrapper.classList.add('a-info-message-container');
    this.infoButton = infoButton = document.createElement('button');
    infoButton.className = 'a-info-message-button';
    infoButton.setAttribute('title', 'Information about this experience');
    // Insert elements.
    wrapper.appendChild(infoButton);
    infoButton.addEventListener('click', function (evt) {
      onClick();
      evt.stopPropagation();
    });
    this.el.sceneEl.appendChild(wrapper);
  },

  infoMessageButtonDataURI: 'url(data:image/jpeg;base64,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)'

});