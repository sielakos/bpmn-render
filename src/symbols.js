export const userTask = {
  tag: 'g',
  children: [
    {
      tag: 'path',
      attributes: {
        d: 'm 15,12 c 0.909,-0.845 1.594,-2.049 1.594,-3.385 0,-2.554 -1.805,-4.62199999 -4.357,-4.62199999 -2.55199998,0 -4.28799998,2.06799999 -4.28799998,4.62199999 0,1.348 0.974,2.562 1.89599998,3.405 -0.52899998,0.187 -5.669,2.097 -5.794,4.7560005 v 6.718 h 17 v -6.718 c 0,-2.2980005 -5.5279996,-4.5950005 -6.0509996,-4.7760005 zm -8,6 l 0,5.5 m 11,0 l 0,-5',
        style: 'fill: white; stroke-width: 0.5px; stroke: black;'
      }
    },
    {
      tag: 'path',
      attributes: {
        d: 'm 15,12 m 2.162,1.009 c 0,2.4470005 -2.158,4.4310005 -4.821,4.4310005 -2.66499998,0 -4.822,-1.981 -4.822,-4.4310005 ',
        style: 'fill: white; stroke-width: 0.5px; stroke: black;'
      }
    },
    {
      tag: 'path',
      attributes: {
        d: 'm 15,12 m -6.9,-3.80 c 0,0 2.25099998,-2.358 4.27399998,-1.177 2.024,1.181 4.221,1.537 4.124,0.965 -0.098,-0.57 -0.117,-3.79099999 -4.191,-4.13599999 -3.57499998,0.001 -4.20799998,3.36699999 -4.20699998,4.34799999 z',
        style: 'fill: black; stroke-width: 0.5px; stroke: black;'
      }
    }
  ]
};

export const exclusiveGateway = {
  tag: 'path',
  attributes: {
    d: 'm 16,15 7.42857142857143,9.714285714285715 -7.42857142857143,9.714285714285715 3.428571428571429,0 5.714285714285715,-7.464228571428572 5.714285714285715,7.464228571428572 3.428571428571429,0 -7.42857142857143,-9.714285714285715 7.42857142857143,-9.714285714285715 -3.428571428571429,0 -5.714285714285715,7.464228571428572 -5.714285714285715,-7.464228571428572 -3.428571428571429,0 z',
    style: 'fill: black; stroke-width: 0.5px; stroke: black;'
  }
};

export const sequenceFlowEnd = {
  tag: 'marker',
  attributes: {
    id: 'sequenceArrow',
    viewBox: '0 0 20 20',
    refX: '11',
    refY: '10',
    markerWidth: '10',
    markerHeight: '10',
    orient: 'auto'
  },
  children: [
    {
      tag: 'path',
      attributes: {
        d: 'M 1 5 L 11 10 L 1 15 Z',
        style: 'fill: black; stroke-width: 1px; stroke-linecap: round; stroke-dasharray: 10000, 1; stroke: black;'
      }
    }
  ]
};
