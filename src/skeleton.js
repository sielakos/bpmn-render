import './styles.scss';

document.body.innerHTML = `
  <header>
    <h1>Static bpmn-js bullshit</h1>
    <nav id="navigation">
      <ul data-target="new-one">Static bpmn-js</ul>
      <ul data-target="normal">Normal bpmn-js</ul>
    </nav>
  </header>
  <div id="panels">
    <div id="new-one">
    </div>
    <div id="normal" class="hidden">
    </div>
  </div>
`;

const tabs = document.querySelectorAll('#navigation ul');
const panels = document.querySelectorAll('#panels > div');

Array.prototype.forEach.call(tabs, tab => {
  const target = document.querySelector(`#${tab.getAttribute('data-target')}`);
  const others = Array.prototype.filter.call(panels, panel => panel !== target);

  tab.addEventListener('click', () => {
    others.forEach(other => other.classList.add('hidden'));
    target.classList.remove('hidden');
  });
});

export const normal = document.querySelector('#normal');
export const newOne = document.querySelector('#new-one');
