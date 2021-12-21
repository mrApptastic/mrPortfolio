import { PortfolioList } from "./portfolio-list";

export interface PortfolioPrint {
  name: string;
  profession: string;
  address: string;
  postalCodeAndCity: string;
  country: string;
  phoneNumber: string;
  eMail: string;
  shortDescription: string;
  listItems: PortfolioList;
}
