import Page from '../../core/templates/page';

class MainPage extends Page {
  static TextObject = {
    MAIN_TITLE: 'Main Page 123',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(MainPage.TextObject.MAIN_TITLE);

    this.container.append(title);
    return this.container;
  }
}

export default MainPage;
