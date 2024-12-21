export class Contract<T> {
  public contractUID = '';
  public code: string;
  public showInTabs = true;
  public nameInTab = 'AECodeName';
  public shareId = '';
  public activeTab = false;
  public errorHighlights: any;
  public sharingHighlighters: any[] = [];
  public latestACI: any;

  constructor(params: Record<string, any>) {
    this.contractUID = String(Date.now());
    params._nameInTab != undefined ? (this.nameInTab = params._nameInTab) : true;
    params._shareId != undefined ? (this.shareId = params._shareId) : true;
    params._code != undefined ? (this.code = params._code) : (this.code = `your ae code`);
  }

  //experimental
  public showInTabsOrNot(): boolean {
    return this.showInTabs;
  }
}
