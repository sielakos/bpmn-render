export default container => {
  const svg = container.querySelector('svg');
  const g = svg.children[1];
  let isInDrag = false;

  svg.addEventListener('wheel', moveObject);

  svg.addEventListener('mousedown', () => isInDrag = true);
  document.addEventListener('mouseup', () => isInDrag = false);
  svg.addEventListener('mousemove', event => {
    const {movementX, movementY} = event;

    event.preventDefault();

    if (isInDrag) {
      const transform = getTransform();

      const [s1, , , s2, x, y] = getMatrix(transform);

      transform.matrix = [s1, 0, 0, s2, x + movementX / s1, y + movementY / s2];

      setTransform(transform);
    }
  })

  function moveObject(event) {
    event.preventDefault();

  	const delta = -1 * event.deltaY;
    const factor = delta / 400;

    const transform = getTransform();
    const [s1, , , s2, x, y] = getMatrix(transform);

    let newS1 = s1 + factor;
    let newS2 = s2 + factor;

    if (newS1 < 0.3) {
      newS1 = 0.3;
      newS2 = 0.3;
    }

    transform.matrix = [newS1, 0, 0, newS2, x, y];

    setTransform(transform);
  }

  function getMatrix(transform) {
    let {matrix} = transform;

    if (!matrix) {
      matrix = [1, 0, 0, 1, 0, 0]; //default matrix
    }

    return matrix;
  }

  function getTransform() {
    return {
      matrix: getFunction('matrix', 6),
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

          const values = parameters[param];

          return transform + ` ${param}(${values.join(' ')})`;
        }, '')
    );
  }

  function getFunction(name, arity) {
    const transform = g.getAttribute('transform');

    if (!transform) {
      return;
    }
    const part = '(-?[0-9\\.]+)';

    let expr = '';
    for (let i = 0; i < arity; i++) {
      expr += part + '\\s*';
    }

    const scaleRegexp = new RegExp(name + '\\(\\s*' + expr +  '\\s*\\)');
    const matched = transform.match(scaleRegexp);

    if (!matched) {
      return;
    }

    const [, ...values] = matched;

    return values.map(val => +val);
  }
};
