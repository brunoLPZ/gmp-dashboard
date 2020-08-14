import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { AccessHistoryDto } from "../models/accessHistoryDto";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private readonly url: string = environment.settings.gmpServiceUrl;

  constructor(private readonly httpClient: HttpClient) {}

  public getLatestAccesses(limit?: number): Observable<AccessHistoryDto[]>{
    let params = {}
    if (limit != null) {
      params = {
        limit: limit
      }
    }
    return this.httpClient.get<AccessHistoryDto[]>(`${this.url}/history/latest`, {
      params
    });
  }
}
