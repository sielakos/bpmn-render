import BpmnModdle from 'bpmn-moddle';
import diagram1 from './diagram-1.bpmn';

const moddle = new BpmnModdle();

moddle.fromXML(diagram1, function(err, definitions) {
  console.log(definitions);
});

document.body.innerHTML = 'shit';
