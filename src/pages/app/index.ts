import Page from '../../core/templates/page';
import MainPage from '../main';
import SettingsPage from '../settings';
import StatisticsPage from '../statistics';
import Header from '../../core/components/header';
import { ErrorTypes, PageIDs } from '../types';
import ErrorPage from '../error';

class App {
  private mainContainer: HTMLElement;
  private header: Header;

  private routes: Record<string, new (idPage: string) => Page> = {
    [PageIDs.MAIN_PAGE]: MainPage,
    [PageIDs.SETTINGS_PAGE]: SettingsPage,
    [PageIDs.STATISTICS_PAGE]: StatisticsPage,
  };

  constructor() {
    this.header = new Header('header', 'header');
    this.mainContainer = document.createElement('main');
  }

  run() {
    document.body.append(this.header.render(), this.mainContainer);
    this.enableRouteChange();
  }

  renderNewPage(idPage: string) {
    this.mainContainer.replaceChildren();

    let page: Page | null = null;

    const pageConstructor = this.routes[idPage];
    page = pageConstructor
      ? new pageConstructor(idPage)
      : new ErrorPage(idPage, ErrorTypes.ERROR_404);

    this.mainContainer.append(page.render());
  }

  private enableRouteChange() {
    ['load', 'hashchange'].forEach(ev => {
      window.addEventListener(ev, () => {
        const hash = window.location.hash.slice(1);

        this.renderNewPage(hash || PageIDs.MAIN_PAGE);
      });
    });
  }
}

export default App;
