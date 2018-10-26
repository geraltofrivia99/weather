import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  
  private _file: Subject<object> = new Subject<object>();

  constructor() { }

  setChoosenFile(file: object) {
    this._file.next(file);
  }
  getFile() {
    return this._file;
  }
}
