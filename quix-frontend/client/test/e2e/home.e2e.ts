import {expect} from 'chai';
import {Driver} from './driver';
import {HomeTestkit} from '../../src/state-components/home/home-testkit';
import {NotebookTestkit} from '../../src/state-components/notebook/notebook-testkit';

describe('Home ::', () => {
  let driver: Driver, testkit: HomeTestkit;

  beforeEach(async () => {
    driver = new Driver();
    await driver.init();
    await driver.goto('/home');

    testkit = new HomeTestkit(driver.getTestkitPage());
  });

  it('should navigate to notebooks state', async () => {
    await testkit.clickNotebooks();

    expect(await driver.url.matches('/files/')).to.be.true;
  });

  it('should create a notebook and navigate to it', async () => {
    await driver.goto('/home');
    await testkit.clickAddNotebook();

    expect(await driver.url.matches('/notebook/:id')).to.be.true;
  });

  it('should focus the newly created notebook name', async () => {
    await driver.goto('/home');
    await testkit.clickAddNotebook();

    const notebookTestkit = new NotebookTestkit(driver.getTestkitPage());
    const breadcrumbsTestkit = await notebookTestkit.getBreadcrumbsTestkit();

    expect(await breadcrumbsTestkit.numOfFiles()).to.equal(2);
    expect(await breadcrumbsTestkit.isFileNameFocused()).to.be.true;
  });
});
