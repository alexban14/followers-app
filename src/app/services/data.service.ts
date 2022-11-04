// here we write logic of working with the back-end
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppError } from '../common/app.error';
import { BadInput } from '../common/bad-input';
import { NotFoundError } from '../common/not-found-error';

@Injectable()
export class DataService {

  constructor(@Inject(String) private url: string, private http: HttpClient) { }

  getAll() {
    return this.http.get(this.url).pipe(
      catchError(this.handelError),
      map(response => response)
    );
  }

  create(resource: any) {
    return this.http.post(this.url, JSON.stringify).pipe(
      catchError(this.handelError),
      map(response => response)
    );
  }

  update(resource: any) {
    return this.http.patch(this.url + '/' + resource.id, JSON.stringify({ isRead: true})).pipe(
      catchError(this.handelError),
      map(response => response)
    );
  }

  delete(id: any) {
    // return throwError(() => new AppError());

    return this.http.delete(this.url + '/' + id).pipe(
      catchError(this.handelError),
      map(response => response)
    );
  }

  private handelError(error: Response) {
    if (error.status === 400) {
      return throwError(() => new BadInput(error.json()));
    }

    if (error.status === 404) {
      return throwError(() => new NotFoundError());
    }

    return throwError(() => new AppError(error));
  }
}
