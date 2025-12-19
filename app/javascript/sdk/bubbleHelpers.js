import { addClasses, removeClasses, toggleClass } from './DOMHelpers';
import { IFrameHelper } from './IFrameHelper';
import { isExpandedView } from './settingsHelper';
import {
  CHATWOOT_CLOSED,
  CHATWOOT_OPENED,
} from '../widget/constants/sdkEvents';
import { dispatchWindowEvent } from 'shared/helpers/CustomEventHelper';

// Logo Varejão - Símbolo infinito estilizado
export const bubbleSVG =
  'M485 1079 c-99 -8 -184 -38 -262 -92 -82 -58 -145 -136 -184 -228 -20 -48 -33 -99 -38 -155 -2 -18 -2 -70 0 -88 6 -67 22 -124 51 -183 12 -24 19 -37 32 -58 69 -106 175 -184 298 -217 31 -9 63 -14 96 -17 22 -2 83 -1 104 2 102 13 193 52 273 118 16 13 50 48 64 64 70 84 110 177 120 282 2 16 2 69 0 85 -6 58 -22 117 -47 168 -26 52 -55 93 -96 136 -40 41 -82 73 -131 100 -61 31 -117 50 -180 60 -27 4 -72 7 -100 23z m-114 -317 c1 -1 5 -5 10 -9 19 -16 29 -25 41 -36 17 -17 29 -25 57 -46 16 -12 40 -36 57 -57 3 -4 18 -27 26 -39 5 -8 18 -27 26 -39 2 -3 4 -7 4 -8 0 -2 -2 -6 -7 -12 -4 -5 -9 -12 -11 -15 -2 -3 -9 -12 -14 -19 -2 -3 -9 -12 -10 -14 -1 -1 -6 -9 -10 -13 -8 -9 -8 -9 -16 -11 -2 0 -4 1 -5 5 -20 26 -51 62 -62 73 -30 29 -71 73 -95 102 -11 13 -31 38 -45 54 -30 37 -71 68 -110 80 -22 7 -43 9 -71 5 -42 -6 -74 -50 -68 -93 3 -20 11 -36 26 -51 9 -9 12 -11 20 -15 16 -8 33 -11 51 -9 24 3 43 14 69 38 26 24 41 45 86 120 25 41 38 56 76 85 7 5 13 10 14 10 2 1 -4 -12 -35 -71 -17 -33 -47 -82 -62 -103 -20 -27 -46 -57 -63 -71 -21 -19 -45 -31 -70 -37 -12 -2 -35 -3 -46 -1 -38 7 -67 29 -85 64 -14 28 -16 62 -5 92 14 36 42 62 80 73 7 2 10 2 27 -3 5 -2 14 -5 20 -6 17 -5 35 -22 33 -25 0 -1 -11 21 -24 47 -5 10 -11 22 -14 27 -3 5 -8 15 -11 21 -3 5 -14 25 -24 45 l-18 36 2 0 2 0z m379 -74 c53 -9 93 -44 114 -99 7 -18 8 -27 7 -51 0 -24 -1 -32 -7 -50 -3 -11 -13 -31 -20 -42 -22 -32 -58 -57 -96 -65 -12 -3 -40 -4 -53 -2 -33 4 -67 20 -99 47 -17 14 -53 50 -58 57 l-3 5 3 -2 c2 -1 3 -1 4 1 0 1 2 4 4 6 4 4 4 4 19 20 20 22 39 48 46 64 0 2 4 7 8 11 4 5 9 14 11 20 2 6 4 12 6 15 4 8 5 18 4 22 0 1 0 4 1 7 3 9 52 -51 80 -97 4 -8 18 -30 29 -48 2 -3 8 -6 14 -6 2 0 4 2 4 4 0 2 -5 16 -11 32 -3 8 -8 19 -10 24 -4 10 -8 19 -16 36 -4 10 -11 23 -13 28 -2 4 -4 9 -4 11 0 1 -1 4 -2 6 -2 5 -3 10 -3 11 0 2 -5 11 -10 20 4 -2 8 -3 55 -10z m-34 -261 l-7 -66 -19 0 -19 0 3 5 c0 1 4 20 7 43 3 23 6 42 7 43 1 0 2 6 3 12 1 5 3 10 5 11 2 1 8 0 13 -2 8 -3 9 -16 7 -46z';


export const body = document.getElementsByTagName('body')[0];
export const widgetHolder = document.createElement('div');

export const bubbleHolder = document.createElement('div');
export const chatBubble = document.createElement('button');
export const closeBubble = document.createElement('button');
export const notificationBubble = document.createElement('span');

export const setBubbleText = bubbleText => {
  if (isExpandedView(window.$chatwoot.type)) {
    const textNode = document.getElementById('woot-widget--expanded__text');
    textNode.innerText = bubbleText;
  }
};

export const createBubbleIcon = ({ className, path, target }) => {
  let bubbleClassName = `${className} woot-elements--${window.$chatwoot.position}`;
  const bubbleIcon = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  );
  bubbleIcon.setAttributeNS(null, 'id', 'woot-widget-bubble-icon');
  bubbleIcon.setAttributeNS(null, 'width', '24');
  bubbleIcon.setAttributeNS(null, 'height', '24');
  bubbleIcon.setAttributeNS(null, 'viewBox', '0 0 1080 1080');
  bubbleIcon.setAttributeNS(null, 'fill', 'none');
  bubbleIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

  const bubblePath = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path'
  );
  bubblePath.setAttributeNS(null, 'd', path);
  bubblePath.setAttributeNS(null, 'fill', '#FFFFFF');

  bubbleIcon.appendChild(bubblePath);
  target.appendChild(bubbleIcon);

  if (isExpandedView(window.$chatwoot.type)) {
    const textNode = document.createElement('div');
    textNode.id = 'woot-widget--expanded__text';
    textNode.innerText = '';
    target.appendChild(textNode);
    bubbleClassName += ' woot-widget--expanded';
  }

  target.className = bubbleClassName;
  target.title = 'Open chat window';
  return target;
};

export const createBubbleHolder = hideMessageBubble => {
  if (hideMessageBubble) {
    addClasses(bubbleHolder, 'woot-hidden');
  }
  addClasses(bubbleHolder, 'woot--bubble-holder');
  bubbleHolder.id = 'cw-bubble-holder';
  bubbleHolder.dataset.turboPermanent = true;
  body.appendChild(bubbleHolder);
};

const handleBubbleToggle = newIsOpen => {
  IFrameHelper.events.onBubbleToggle(newIsOpen);

  if (newIsOpen) {
    dispatchWindowEvent({ eventName: CHATWOOT_OPENED });
  } else {
    dispatchWindowEvent({ eventName: CHATWOOT_CLOSED });
    chatBubble.focus();
  }
};

export const onBubbleClick = (props = {}) => {
  const { toggleValue } = props;
  const { isOpen } = window.$chatwoot;
  if (isOpen === toggleValue) return;

  const newIsOpen = toggleValue === undefined ? !isOpen : toggleValue;
  window.$chatwoot.isOpen = newIsOpen;

  toggleClass(chatBubble, 'woot--hide');
  toggleClass(closeBubble, 'woot--hide');
  toggleClass(widgetHolder, 'woot--hide');

  handleBubbleToggle(newIsOpen);
};

export const onClickChatBubble = () => {
  bubbleHolder.addEventListener('click', onBubbleClick);
};

export const addUnreadClass = () => {
  const holderEl = document.querySelector('.woot-widget-holder');
  addClasses(holderEl, 'has-unread-view');
};

export const removeUnreadClass = () => {
  const holderEl = document.querySelector('.woot-widget-holder');
  removeClasses(holderEl, 'has-unread-view');
};
