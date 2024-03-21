import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _isLoading: boolean = false;
  public set isLoading(value: boolean) {
    this._isLoading = value;
  }
  public get isLoading() {
    return this._isLoading;
  }

  public setLoaderMock(time: number = 1000): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, time);
  }
}
