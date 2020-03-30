import { Injectable, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

import { SortColumn, SortDirection } from '../custom/directive/sortable.directive';
import { IAUCTION } from '../custom/interface/auction';

interface SearchResult {
  entries: IAUCTION[];
  total: number;
}

interface State {
  page: number,
  pageSize: number,
  searchTerm: string,
  sortColumn: SortColumn,
  sortDirection: SortDirection,
  category : number,
  status : Array<number>
}

const compare = (v1: number, v2: number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(entries: IAUCTION[], column: SortColumn, direction: string): IAUCTION[] {
  if (direction === '' || column === '') {
    return entries;
  } else {
    return [...entries].sort((a, b) => {
      const res = compare(a.auction.dateListed[a.auction.dateListed.length-1], b.auction.dateListed[b.auction.dateListed.length-1] );
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(entry: IAUCTION, term: string, pipe: PipeTransform) {
  return entry.auction.description.toLowerCase().includes(term.toLowerCase())
}

@Injectable({providedIn: 'root'})
export class TableControlService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _auctions$ = new BehaviorSubject<IAUCTION[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: 'desc',
    category : undefined,
    status : []
  };

  constructor(private pipe: DecimalPipe) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._auctions$.next(result.entries);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  public AUCTIONS :Array<IAUCTION>;

  get auctions$() { return this._auctions$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }
  get category() { return this._state.category; }
  get status() { return this._state.status; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }
  set category(category: number) { this._set({category}); }
  set status(status: Array<number>) { this._set({status}); }
  
  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }
  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let entries = sort(this.AUCTIONS,  sortColumn, sortDirection);

    // 2. filter
    entries = entries.filter(entry => matches(entry, searchTerm, this.pipe));
    const total = entries.length;

    // 3. paginate
    entries = entries.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({entries, total});
  }

}