import Page from '../../core/templates/page';

export default class SettingsPage extends Page {
  static TextObject = {
    MAIN_TITLE: 'Settings Page',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(SettingsPage.TextObject.MAIN_TITLE);
    this.container.append(title);

    return this.container;
  }
}
