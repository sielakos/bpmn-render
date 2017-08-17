import BpmnModdle from 'bpmn-moddle';
import {renderSvg} from './render-svg';
import {userTask, exclusiveGateway, sequenceFlowEnd} from './symbols';

const moddle = new BpmnModdle();

export default (container, xml) => {
  moddle.fromXML(xml, function(err, definitions) {
    const svg = {
      tag: 'svg',
      attributes: {
        width: '100%',
        height: '100%'
      },
      children: getDefs().concat(definitions.diagrams.map(renderElement))
    };

    container.innerHTML = renderSvg(svg);
  });
};

function getDefs() {
  return [
    {
      tag: 'defs',
      children: [
        sequenceFlowEnd
      ]
    }
  ];
}

function renderElement(element) {
  if (!element) {
    return;
  }

  const {$type} = element;

  switch ($type) {
    case 'bpmndi:BPMNDiagram':
      return renderDiagram(element);
    case 'bpmndi:BPMNPlane':
      return renderPlane(element);
    case 'bpmndi:BPMNShape':
      return renderShape(element);
    case 'bpmndi:BPMNEdge':
      return renderEdge(element);
  }

  console.log('other', element);
}

function renderDiagram(diagram) {
  return {
    tag: 'g',
    attribute: {
      'data-diagram-id': diagram.id
    },
    children: [renderElement(diagram.plane)]
  };
}

function renderPlane(plane) {
  return {
    tag: 'g',
    children: plane.planeElement.map(renderElement)
  };
}

function renderShape(shape) {
  const {bpmnElement: {$type}} = shape;

  switch ($type) {
    case 'bpmn:StartEvent':
      return renderEvent(shape, {});
    case 'bpmn:EndEvent':
      return renderEvent(shape, {
        'stroke-width': '4px'
      });
    case 'bpmn:Task':
      return renderTask(shape, {});
    case 'bpmn:UserTask':
      return renderTask(shape, {}, [userTask]);
    case 'bpmn:ExclusiveGateway':
      return renderGateway(shape, {}, [exclusiveGateway]);
    case 'bpmn:TextAnnotation':
      return renderAnnotation(shape);
  }

  console.log('shape', $type, shape);
}

function renderAnnotation(shape) {
  const {width, height, x, y} = shape.bounds;
  const {bpmnElement: {text}} = shape;

  const path = 'm 0, 0 m 10,0 l -10,0 l 0,30 l 10,0';

  return {
    tag: 'g',
    attributes: {
      transform: `translate(${x}, ${y})`
    },
    children: [
      {
        tag: 'path',
        attributes: {
          d: path,
          style: 'fill: none; stroke-width: 2px; stroke: black;'
        }
      },
      {
        tag: 'foreignObject',
        attributes: {
          x: 5,
          y: -5,
          width,
          height
        },
        children: [
          {
            tag: 'p',
            attributes: {
              xmlns: 'http://www.w3.org/1999/xhtml',
              style: 'font-family: Arial, sans-serif; font-size: 12px;'
            },
            children: [text]
          }
        ]
      }
    ]
  }
}

function renderLabel(label, text) {
  if (!label || !text) {
    return;
  }

  const {x, y, width, height} = label.bounds;

  return {
    tag: 'foreignObject',
    attributes: {
      x,
      y,
      width,
      height
    },
    children: [
      {
        tag: 'div',
        attributes: {
          xmlns: 'http://www.w3.org/1999/xhtml',
          style: 'font-family: Arial, sans-serif; font-size: 11px; text-align: center; display: table; h overflow: hidden; width: 100%; height: 100%'
        },
        children: [
          {
            tag: 'div',
            attributes: {
              style: 'display: table-cell; vertical-align: middle;'
            },
            children: [
              {
                tag: 'div',
                children: [text]
              }
            ]
          }
        ]
      }
    ]
  };
}

function renderEvent(shape, attrs) {
  const {width, height, x, y} = shape.bounds;

  const cx = x + width/2;
  const cy = y + height/2;
  const r = Math.round((width + height) / 4);

  const defaultAttrs = {
    cx,
    cy,
    r,
    stroke: 'black',
    'stroke-width': '2px',
    fill: 'white'
  }

  const {bpmnElement: {name}} = shape;

  return {
    tag: 'g',
    children: [
      {
        tag: 'circle',
        attributes: Object.assign(defaultAttrs, attrs)
      },
      renderLabel(shape.label, name)
    ]
  };
}

function renderTask(shape, attrs, extras) {
  const {width, height, x, y} = shape.bounds;
  const {bpmnElement: {name}} = shape;

  const defaultAttrs = {
    x,
    y,
    width,
    height,
    rx: 10,
    ry: 10,
    stroke: 'black',
    'stroke-width': '2px',
    fill: 'white'
  };

  return {
    tag: 'g',
    children: [
      {
        tag: 'rect',
        attributes: Object.assign(defaultAttrs, attrs)
      },
      {
        tag: 'g',
        attributes: {
          transform: `translate(${x}, ${y})`
        },
        children: extras
      },
      renderLabel(shape, name)
    ]
  };
}

function renderGateway(shape, attrs, extras) {
  const {width, height, x, y} = shape.bounds;
  const {bpmnElement: {name}} = shape;

  const defaultAttrs = {
    x,
    y,
    points: '25,0 50,25 25,50 0,25',
    stroke: 'black',
    'stroke-width': '2px',
    fill: 'white'
  };

  console.log(shape);

  return {
    tag: 'g',
    children: [
      {
        tag: 'g',
        attributes: {
          transform: `translate(${x}, ${y})`
        },
        children: [
          {
            tag: 'polygon',
            attributes: Object.assign(defaultAttrs, attrs)
          }
        ].concat(extras)
      },
      renderLabel(shape.label, name)
    ]
  };
}

function renderEdge(edge) {
  const {waypoint, bpmnElement: {$type}} = edge;

  const points = getEdgePoints(waypoint);
  const style = getEdgeStyle($type);

  return {
    tag: 'path',
    attributes: {
      d: points,
      style
    }
  };
}

function getEdgeStyle($type) {
  switch ($type) {
    case 'bpmn:SequenceFlow':
      return 'fill: none; stroke-width: 2px; stroke: black; stroke-linejoin: round; marker-end: url(#sequenceArrow);';
    case 'bpmn:Association':
      return 'fill: none; stroke: black; stroke-width: 2px; stroke-dasharray: 0.5, 5; stroke-linecap: round; stroke-linejoin: round;';
  }

  console.log('edge type', $type);

  return '';
}

function getEdgePoints(waypoint) {
  return waypoint.reduce((points, {x, y}) => {

    if (!points.length) {
      return `M ${x},${y}`;
    }

    return points + ` L ${x},${y}`;
  }, '');
}
