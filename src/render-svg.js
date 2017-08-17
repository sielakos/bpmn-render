export function renderSvg(svg) {
  if (!svg) {
    return '';
  }

  const {tag, attributes, children} = svg;

  return `<${tag} ${renderAttributes(attributes)}>
    ${renderChildren(children)}
  </${tag}>`
}

function renderAttributes(attributes) {
  if (!attributes) {
    return '';
  }

  return Object
    .keys(attributes)
    .reduce((str, attribute) => {
      const value = attributes[attribute];

      return `${str} ${attribute}="${value}"`;
    }, '');
}

function renderChildren(children) {
  if (!children) {
    return '';
  }

  return children.reduce((str, svgElement) => {
    if (typeof svgElement === 'string') {
      return str + ' ' + svgElement;
    }

    return str + ' ' + renderSvg(svgElement);
  }, '');
}
