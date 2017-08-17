import Viewer from 'bpmn-js/lib/NavigatedViewer';

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
