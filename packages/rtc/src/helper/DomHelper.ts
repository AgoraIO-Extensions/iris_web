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
    this.containerElement = dom;
    return dom;
  }

  public getIrisElement(): HTMLDivElement {
    return this.containerElement;
  }

  public remove() {
    this.containerElement?.remove();
  }

  release() {
    this.remove();
  }
}
