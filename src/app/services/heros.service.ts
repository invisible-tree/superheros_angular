import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HerosService {
  private herosDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  herosData$: Observable<any[]> = this.herosDataSubject.asObservable();
  herosData: any;

  constructor(private http: HttpService) {
    this.fetchHeroesData();
  }

  private fetchHeroesData(): void {
    this.http.getData().subscribe((data) => {
      this.herosData = data;
      this.herosDataSubject.next(this.herosData);
    });
  }

  public getHeroById(id: number): any {
    return this.herosData.find((el: { id: number }) => el.id === id);
  }

  public setNewHero(hero: any, id?: number): void {
    if (id) {
      const index = this.herosData.findIndex(
        (hero: { id: number }) => hero.id === id
      );
      if (index !== -1) {
        this.herosData[index] = hero;
      }
    }
    this.herosData.push({
      ...hero,
      id: this.getLastId(),
    });
    this.herosDataSubject.next(this.herosData);
  }

  public getLastId(): number {
    if (this.herosData.length === 0) {
      return 0;
    } else {
      return this.herosData[this.herosData.length - 1].id;
    }
  }

  public deleteHero(id: number): void {
    this.herosData = this.herosData.filter(
      (el: { id: number }) => el.id !== id
    );
    this.herosDataSubject.next(this.herosData);
  }
}
