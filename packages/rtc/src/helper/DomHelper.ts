export class IrisElement {
  public containerID: string = 'IRIS-WEB-CONTAINER';
  public containerElement: HTMLDivElement;
  public containerDisplay: string = 'none';
  constructor(containerID?: string) {
    if (containerID) {
      this.containerID = containerID;
    }
  }
  public createIrisElement(): HTMLDivElement {
    const dom = document.createElement('div');
    dom.id = this.containerID;
    // dom.style.display = this.containerDisplay;
    this.containerElement = dom;
    return dom;
  }

  public getIrisElement(): HTMLDivElement {
    return this.containerElement;
  }

  public remove() {
    this.containerElement?.remove();
    this.containerElement = null;
  }

  dispose() {
    this.remove();
  }
}
