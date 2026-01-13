import Page from '../../core/templates/page';
import MainPage from '../main';
import SettingsPage from '../settings';
import StatisticsPage from '../statistics';
import Header from '../../core/components/header';
import { ErrorTypes, PageIDs } from '../types';
import ErrorPage from '../error';

// Интерфейс для конфигурации роута
interface RouteConfig {
  path: string;
  component: new (id: string) => Page;
  title?: string; // Опционально: заголовок страницы для document.title
}

class App {
  private mainContainer: HTMLElement;
  private header: Header;

  // Массив конфигураций роутов
  private routes: RouteConfig[] = [
    {
      path: PageIDs.MAIN_PAGE,
      component: MainPage,
      title: 'Main Page',
    },
    {
      path: PageIDs.SETTINGS_PAGE,
      component: SettingsPage,
      title: 'Settings',
    },
    {
      path: PageIDs.STATISTICS_PAGE,
      component: StatisticsPage,
      title: 'Statistics',
    },
  ];

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

    // Находим роут по path
    const route = this.routes.find(r => r.path === idPage);

    const page = route ? new route.component(idPage) : new ErrorPage(idPage, ErrorTypes.ERROR_404);

    // Опционально: меняем заголовок страницы
    if (route?.title) {
      document.title = route.title;
    }

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
//
