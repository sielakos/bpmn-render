import diagram1 from './diagram-1.bpmn';
import {normal, newOne} from './skeleton';
import initClassicViewer from './classic-viewer';
import initNewViewer from './new-viewer';
import addNavigation from './navigation';

initClassicViewer(normal, diagram1);
initNewViewer(newOne, diagram1);

// Add some basic naviation
setTimeout(addNavigation.bind(null, newOne));
