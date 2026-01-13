import Page from '../../core/templates/page';

export default class StatisticsPage extends Page {
  static TextObject = {
    MAIN_TITLE: 'Statistics Page',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(StatisticsPage.TextObject.MAIN_TITLE);
    this.container.append(title);

    return this.container;
  }
}
