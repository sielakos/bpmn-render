import Viewer from 'bpmn-js';

export default (container, xml) => {
  const viewer = new Viewer({
    container
  });

  viewer.importXML(xml, err => {
    if (err) {
      container.innerHTML = 'error';
    }
  })
};
