import diagram1 from './diagram-1.bpmn';
import {normal, newOne} from './skeleton';
import initClassicViewer from './classic-viewer';
import initNewViwer from './new-viewer';

initClassicViewer(normal, diagram1);
initNewViwer(newOne, diagram1);
