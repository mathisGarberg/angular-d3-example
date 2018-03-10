import { AngularD3ExamplePage } from './app.po';

describe('angular-d3-example App', () => {
  let page: AngularD3ExamplePage;

  beforeEach(() => {
    page = new AngularD3ExamplePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
