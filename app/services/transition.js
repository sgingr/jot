import Service from '@ember/service';

export default Service.extend({
  /*
  |----------------------------------------------------------
  | Properties
  |----------------------------------------------------------
  */
  activePage: 'categoriesPage',
  initialAnimation: 'slideInLeft',
  hiddenClass: 'hidden',
  flattenedClass: 'flattened',

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
        toAction: 'slideInRight',
        fromAction: 'slideOutLeft',
      }, {
        to: 'categoriesPage',
        from: 'notesPage',
        toAction: 'slideInLeft',
        fromAction: 'slideOutRight',
      }, {
        to: 'newNotePage',
        from: 'notesPage',
        toAction: 'slideInDown',
        fromAction: 'slideOutRight',
      }, {
        to: 'categoriesPage',
        from: 'newNotePage',
        toAction: 'slideInLeft',
        fromAction: 'slideOutRight',
      }, {
        to: 'notesPage',
        from: 'newNotePage',
        toAction: 'slideInRight',
        fromAction: 'slideOutLeft',
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

        fromElem.classList.remove(mapObj.fromAction);
        fromElem.classList.remove(obj.initialAnimation);
        fromElem.classList.add(obj.hiddenClass);
        obj.set('activePage', to);
      };

      fromElem.addEventListener(obj._getAnimationEndEvent(), waitForAnimation);
      fromElem.classList.add(mapObj.fromAction);
      toElem.classList.remove(obj.hiddenClass);
      toElem.classList.add(mapObj.toAction);
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
          //elem.classList.add(obj.flattenedClass);
        }
      };

      elem.addEventListener(obj._getAnimationEndEvent(), waitForAnimation);
      elem.classList.remove(obj.hiddenClass);
      //elem.classList.remove(obj.flattenedClass);
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
      //elem.classList.toggle('is-expanded');
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
