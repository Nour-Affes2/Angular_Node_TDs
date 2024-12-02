import { Injectable } from '@angular/core';


const STORAGE_KEY = 'lesson-app:lastSessionId';

interface StoredInfo {
  lastLessonId?: number|null;
}

@Injectable({
  providedIn: 'root',
})

export class UserSettingsService {
  private _lastLessonId: number | null = null;

  constructor() {
    const storedInfo = this.loadInfoFromLocalStorage();
    this.lastLessonId = storedInfo.lastLessonId || null;
  }

  get lastLessonId(): number | null {
    return this._lastLessonId;
  }

  set lastLessonId(value: number | null) {
    this._lastLessonId = value;
    this.saveInfoToLocalStorage();
  }

  private loadInfoFromLocalStorage(): StoredInfo {
    const storedJson = window.localStorage.getItem(STORAGE_KEY);
    const result = storedJson
      ? JSON.parse(storedJson)
      : { lastLessonId: null };
    console.log('Reading from localStorage:', STORAGE_KEY, result);
    return result;
  }

  private saveInfoToLocalStorage(): void {
    const info: StoredInfo = { lastLessonId: this.lastLessonId };
    const json = JSON.stringify(info);
    console.log('Writing to localStorage:', STORAGE_KEY, info);
    window.localStorage.setItem(STORAGE_KEY, json);
  }
}
