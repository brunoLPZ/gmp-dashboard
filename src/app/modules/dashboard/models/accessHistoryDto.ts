import { BlacklistDto } from "./blacklistDto";

export class AccessHistoryDto {
  id: number;
  blacklist: BlacklistDto;
  userEmail: string;
  falsePositive: boolean;
  deposit: boolean;
  createdDate: string;
}
