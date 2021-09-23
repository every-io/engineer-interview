export enum ListOptions {
  todo= 'todo',
  inprogress= 'inprogress',
  done= 'done',
} 

export type CardType = {
  id: string
  title: string,
  list: ListOptions
}