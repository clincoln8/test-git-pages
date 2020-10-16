import {Node} from '../graph.js';
import * as API from '../server-api';

test('testing getClassName', async () => {
  const node = Node.getNode('localId', true);
  node.setDCID('StatVarObservation');
  const className = await API.getElemId(node);
  expect(className).toBe('blue');

  const node2 = Node.getNode('test', true);
  node2.setDCID('test');
  const className2 = await API.getElemId(node2);
  expect(className2).toBe('red');
});
