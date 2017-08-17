export default container => {
  const svg = container.querySelector('svg');
  const g = svg.children[1];
  let isInDrag = false;

  svg.addEventListener('wheel', moveObject);

  svg.addEventListener('mousedown', () => isInDrag = true);
  svg.addEventListener('mouseup', () => isInDrag = false);
  svg.addEventListener('mousemove', event => {
    const {movementX, movementY} = event;

    event.preventDefault();

    if (isInDrag) {
      const transform = getTransform();
      let {translate} = transform;

      if (!translate) {
        translate = {
          x: 0,
          y: 0
        };
      }

      const newTranslate = {
        x: translate.x + movementX,
        y: translate.y + movementY
      };

      console.log(translate, movementX, movementY, newTranslate);

      transform.translate = newTranslate;

      setTransform(transform);
    }
  })

  function moveObject(event) {
    event.preventDefault();

  	const delta = event.deltaY;

    const transform = getTransform();
    let {scale} = transform;

    if (!scale) {
      scale = {
        x: 1,
        y: 1
      };
    }

    const factor = 200;

    const newScale = {
      x: scale.x + delta/factor,
      y: scale.y + delta/factor
    };

    if (newScale.x < 0.3) {
      newScale.x = 0.3;
    }

    if (newScale.y < 0.3) {
      newScale.y = 0.3;
    }

    console.log(scale, delta / factor, newScale);

    transform.scale = newScale;

    setTransform(transform);
  }

  function getTransform() {
    return {
      scale: get2DFunction('scale'),
      translate: get2DFunction('translate')
    };
  }

  function setTransform(parameters) {
    g.setAttribute(
      'transform',
      Object
        .keys(parameters)
        .reduce((transform, param) => {
          if (!parameters[param]) {
            return transform;
          }

          const {x, y} = parameters[param];

          return transform + ` ${param}(${x} ${y})`;
        }, '')
    );
  }

  function get2DFunction(name) {
    const transform = g.getAttribute('transform');

    if (!transform) {
      return;
    }

    const scaleRegexp = new RegExp(name + '\\(\\s*([0-9\\.]+)\\s*([0-9\\.]+)\\s*\\)');
    const matched = transform.match(scaleRegexp);

    if (!matched) {
      return;
    }

    const [, x, y] = matched;

    return {
      x: +x,
      y: +y
    };
  }
};
