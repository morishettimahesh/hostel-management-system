export * from "@hostel/shared";

export interface NavItem {
  title: string;
  href: string;
  icon: string;
  badge?: string;
  roles?: string[];
}
