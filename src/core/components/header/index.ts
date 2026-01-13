import Component from '../../templates/component';
import { PageIDs } from '../../../pages/types';

const buttons = [
  {
    id: PageIDs.MAIN_PAGE,
    text: 'Main Page',
  },
  {
    id: PageIDs.SETTINGS_PAGE,
    text: 'Settings Page',
  },
  {
    id: PageIDs.STATISTICS_PAGE,
    text: 'Statistics Page',
  },
];

export default class Header extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderPageButtons() {
    const pageButtons = document.createElement('div');

    buttons.forEach(btn => {
      const button = document.createElement('a');
      button.href = `#${btn.id}`;
      button.textContent = btn.text;
      pageButtons.append(button);
    });

    this.container.append(pageButtons);
  }

  render() {
    this.renderPageButtons();
    return this.container;
  }
}
