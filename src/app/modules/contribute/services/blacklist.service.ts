import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { formatDate } from "@angular/common";
import { BlacklistDto } from "../../dashboard/models/blacklistDto";

@Injectable({
  providedIn: 'root'
})
export class BlacklistService {

  private readonly url: string = environment.settings.gmpServiceUrl;

  constructor(private readonly httpClient: HttpClient) {
  }

  public createBlacklistItem(blacklistItem: BlacklistDto): Observable<BlacklistDto> {
    return this.httpClient.post<BlacklistDto>(`${this.url}/blacklist`, blacklistItem);
  }
}
