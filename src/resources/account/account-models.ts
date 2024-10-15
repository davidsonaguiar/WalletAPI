export interface Account {
  id: string;
  name: string;
  userId: string;
}


export interface SaveAccountInput {
  name: string;
}

export interface SaveAccountOutput {
  id: string;
  name: string;
}