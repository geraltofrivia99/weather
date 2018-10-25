import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  
  private _file: Subject<string> = new Subject<string>();

  constructor() { }

  setChoosenFile(file: string) {
    this._file.next(file);
  }
  getFile() {
    return this._file;
  }
}
