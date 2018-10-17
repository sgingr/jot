import Service from '@ember/service';

export default Service.extend({
  /*
  |----------------------------------------------------------
  | Properties
  |----------------------------------------------------------
  */
  activePage: 'categoriesPage',
  hiddenClass: 'hidden',

  /*
  |----------------------------------------------------------
  | init
  |----------------------------------------------------------
  */
  init() {
    let obj = this;
    obj._super(...arguments);

    obj.set('maps', [
      {
        to: 'notesPage',
        from: 'categoriesPage',
        toAction: 'fadeInRight',
        fromAction: 'fadeOutLeft',
      }, {
        to: 'categoriesPage',
        from: 'notesPage',
        toAction: 'fadeInLeft',
        fromAction: 'fadeOutRight',
      }, {
        to: 'newNotePage',
        from: 'notesPage',
        toAction: 'fadeInDown',
        fromAction: 'fadeOutRight',
      }, {
        to: 'categoriesPage',
        from: 'newNotePage',
        toAction: 'fadeInLeft',
        fromAction: 'fadeOutRight',
      }, {
        to: 'notesPage',
        from: 'newNotePage',
        toAction: 'fadeInRight',
        fromAction: 'fadeOutLeft',
      }, {
        to: 'noteMenuPage',
        from: 'notesPage',
        toAction: 'fadeInDown',
        fromAction: 'blur',
      },
    ])
  },

  /*
  |----------------------------------------------------------
  | transition
  |----------------------------------------------------------
  */
  transition(to, from) {
    let obj = this;
    let mapObj = obj.maps.find((item) => {
      return (item.to === to && item.from === from);
    });
    if(mapObj) {
      let toElem = document.getElementById(to);
      let fromElem = document.getElementById(from);

      //Event function
      let waitForAnimation = function(e){
        e.target.removeEventListener(e.type, waitForAnimation);
        if(mapObj.fromAction !== 'blur') {
          fromElem.classList.remove(mapObj.fromAction);
          fromElem.classList.add(obj.hiddenClass);
        }
        obj.set('activePage', to);
      };

      fromElem.addEventListener(obj._getAnimationEndEvent(), waitForAnimation);
      fromElem.classList.add(mapObj.fromAction);
      toElem.classList.remove(obj.hiddenClass);
      toElem.classList.add(mapObj.toAction);

      //Handle a blur class with no animation
      /*
      if(mapObj.fromAction === 'blur') {
        obj.set('activePage', to);
      } else {
        fromElem.addEventListener(obj._getAnimationEndEvent(), waitForAnimation);
      }
      */
    }
  },

  /*
  |----------------------------------------------------------
  | animateElement
  |----------------------------------------------------------
  */
  animateElement(id, animationClass, hideAfter) {
    let obj = this;
    let elem = document.getElementById(id);

    if(elem) {
      //Event function
      let waitForAnimation = function(e){
        e.target.removeEventListener(e.type, waitForAnimation);
        elem.classList.remove(animationClass);
        if(hideAfter) {
          elem.classList.add(obj.hiddenClass);
        }
      };

      elem.addEventListener(obj._getAnimationEndEvent(), waitForAnimation);
      elem.classList.remove(obj.hiddenClass);
      elem.classList.add(animationClass);
    }
  },

  /*
  |----------------------------------------------------------
  | animateElement
  |----------------------------------------------------------
  */
  toggleAccordion(id) {
    let obj = this;
    let elem = document.getElementById(id);

    if(elem) {
      elem.classList.toggle('note-is-collapsed');
  		elem.classList.toggle('showNote');
    }
  },

  /*
  |----------------------------------------------------------
  | _getAnimationEndEvent
  |----------------------------------------------------------
  */
  _getAnimationEndEvent() {
    let obj = this;
    let animationEnd = 'animationend';
    if(document) {
      animationEnd = (function(el) {
        var animations = {
          animation: 'animationend',
          OAnimation: 'oAnimationEnd',
          MozAnimation: 'mozAnimationEnd',
          WebkitAnimation: 'webkitAnimationEnd',
        };

        for (var t in animations) {
          if (el.style[t] !== undefined) {
            return animations[t];
          }
        }
      })(document.createElement('div'));
    }
    return animationEnd;
  },



});
