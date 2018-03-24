import { DuvanaFrontPage } from './app.po';

describe('duvana-front App', () => {
  let page: DuvanaFrontPage;

  beforeEach(() => {
    page = new DuvanaFrontPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
