import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { AccessHistoryDto } from "../models/accessHistoryDto";
import { formatDate } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private readonly url: string = environment.settings.gmpServiceUrl;

  constructor(private readonly httpClient: HttpClient) {
  }

  public getLatestAccessesFromTo(from: Date, to?: Date): Observable<AccessHistoryDto[]> {
    const params = Object.assign({},
      { from: formatDate(from, 'y-MM-dd', 'en') },
      to && { to: formatDate(to, 'y-MM-dd', 'en') });
    return this.httpClient.get<AccessHistoryDto[]>(`${this.url}/history`, {
      params
    });
  }

  public getLatestAccesses(limit?: string): Observable<AccessHistoryDto[]> {
    return this.httpClient.get<AccessHistoryDto[]>(`${this.url}/history/latest`, {
      params: {
        limit: limit
      }
    });
  }
}
