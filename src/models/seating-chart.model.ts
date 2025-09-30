import { Guest } from "./guest.model";

export interface SeatingTable {
  id: string;
  name: string;
  capacity: number;
  shape: 'round' | 'rectangle';
}

export interface SeatingAssignment {
  [tableId: string]: string[]; // array of guest IDs
}

export interface AssignedGuest extends Guest {
  tableId: string;
}
