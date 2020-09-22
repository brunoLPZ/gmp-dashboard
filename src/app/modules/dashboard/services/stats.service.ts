import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { formatDate } from "@angular/common";
import { GroupedAccessByDayDto } from "../models/groupedAccessByDayDto";
import { GroupedAccessByMonthDto } from "../models/groupedAccessByMonthDto";

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private readonly url: string = environment.settings.gmpServiceUrl;

  constructor(private readonly httpClient: HttpClient) {
  }

  public getGroupedAccessesByDay(from: Date): Observable<GroupedAccessByDayDto[]> {
    const params = { from: formatDate(from, 'y-MM-dd', 'en'), groupBy: 'DAY'};
    return this.httpClient.get<GroupedAccessByDayDto[]>(
      `${this.url}/stats/time-grouped-accesses`, {params});
  }

  public getGroupedAccessesByMonth(from: Date): Observable<GroupedAccessByMonthDto[]> {
    const params = { from: formatDate(from, 'y-MM-dd', 'en'), groupBy: 'MONTH'};
    return this.httpClient.get<GroupedAccessByMonthDto[]>(
      `${this.url}/stats/time-grouped-accesses`, {params});
  }

  public getGroupedAccessesByItem(from: Date): Observable<any> {
    const params = { from: formatDate(from, 'y-MM-dd', 'en')};
    return this.httpClient.get<any>(
      `${this.url}/stats/item-grouped-accesses`, {params});
  }

}
