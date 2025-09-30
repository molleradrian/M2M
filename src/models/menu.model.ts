export interface MenuItem {
  name: string;
  description: string;
}

export interface Menu {
  appetizers: MenuItem[];
  mains: MenuItem[];
  desserts: MenuItem[];
}
