export interface PortfolioList
{
  certificates: Certificate[],
  educations: Education[],
  experiences: Experience[],
  interests: Interest[],
  languages: Language[],
  projects: Project[],
  qualifications: Qualification[]
}

export interface Certificate extends BaseItem {
  place: string;
  from: string;
  to: string;
}

export interface Education extends BaseItem {
  place: string;
  from: string;
  to: string;
}

export interface Experience extends BaseItem {
  place: string;
  from: string;
  to: string;
}

export interface Interest extends BaseItem {}

export interface Language extends BaseItem {}

export interface Project extends BaseItem {
  place: string;
  from: string;
  to: string;
  demoUrl: string;
  docUrl: string;
  sourceUrl: string;
}

export interface Qualification extends BaseItem {}

export interface BaseItem {
  name: string;
  description: string;
  imageUrl: string;
}
