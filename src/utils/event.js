const eventsEmitter = {
  eventsListeners: {},
  /**
   *
   * @param {string} events event name
   * @param {function} handler event handler
   * @param {boolean} priority priority
   * @returns object
   */
  on(events, handler, priority) {
    const self = eventsEmitter;
    if (typeof handler !== 'function') return self;
    const method = priority ? 'unshift' : 'push';
    events.split(' ').forEach(event => {
      if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
      self.eventsListeners[event][method](handler);
    });
    return self;
  },

  off(events, handler) {
    const self = eventsEmitter;
    if (!self.eventsListeners) return self;
    events.split(' ').forEach(event => {
      if (typeof handler === 'undefined') self.eventsListeners[event] = [];
      else if (self.eventsListeners[event]) {
        self.eventsListeners[event].forEach((eventHandler, index) => {
          if (eventHandler === handler) self.eventsListeners[event].splice(index, 1);
        });
      }
    });
    return self;
  },

  trigger(...args) {
    const self = eventsEmitter;
    if (!self.eventsListeners) return self;
    let events;
    let data;
    let context;
    if (typeof args[0] === 'string' || Array.isArray(args[0])) {
      events = args[0];
      data = args.slice(1, args.length);
      context = self;
    } else {
      events = args[0].events;
      data = args[0].data;
      context = args[0].context || self;
    }

    data.unshift(context);
    const eventsArray = Array.isArray(events) ? events : events.split(' ');
    eventsArray.forEach(event => {
      if (self.eventsListeners && self.eventsListeners[event]) {
        self.eventsListeners[event].forEach(eventHandler => {
          eventHandler.apply(context, data);
        });
      }
    });
    return self;
  }
}

/**
 * @param { any } el the element
 * @param { String } event The string
 * @param { * } handler event handler
 */
function addEvent(el, event, handler) {
  return el.addEventListener(event, handler)
}

function removeEvent(el, event, handler) {
  return el.removeEventListener(event, handler)
}

export {
  addEvent,
  removeEvent,
  eventsEmitter
}
