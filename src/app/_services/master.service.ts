import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { HandleErrorService } from "../_helpers/handle.error";

@Injectable({ providedIn: "root" })

export class MasterService {
  private base: string = "/core/jurusan-inten";
  private basefile: string = "/files/api/file";

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService,
  ) { }

  getList(baseUrl, param: any) {
    return this.http
      .get(`${baseUrl}`, {
          params: new HttpParams({
            fromObject: param
          })
      })
      .pipe(
        tap((result) => {
          return result;
        }),
        catchError((err) => this.handleErrorService.getError(err))
      );
  }

  get(baseUrl, param: any) {
    return this.http
      .get(`${baseUrl}`, param)
      .pipe(
        tap((result) => {
          return result;
        }),
        catchError((err) => this.handleErrorService.getError(err))
      );
  }
  
  getByID(baseUrl, ID: any) {
    return this.http
      .get(`${baseUrl}/${ID}`)
      .pipe(catchError((err) => this.handleErrorService.getError(err)));
  }

  add(baseUrl, param: any) {
    return this.http
      .post(`${baseUrl}`, param)
      .pipe(catchError((err) => this.handleErrorService.getError(err)));
  }

  add3(baseUrl, body: any) {
    return this.http
      .post(`${baseUrl}`, body)
      .pipe(catchError((err) => this.handleErrorService.getError(err)));
  }

  edit(baseUrl, param: any, ID: any) {
    return this.http
      .put(`${baseUrl}/${ID}`, param)
      .pipe(catchError((err) => this.handleErrorService.getError(err)));
  }

  delete(baseUrl, ID: any) { 
    return this.http
      .delete(`${baseUrl}/` + ID)
      .pipe(catchError((err) => this.handleErrorService.getError(err)));
  }

  deleteBy(baseUrl, param: any) {
    return this.http
      .post(`${baseUrl}`, param)
      .pipe(catchError((err) => this.handleErrorService.getError(err)));
  }
}
