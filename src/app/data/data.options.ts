export const ratingOptions:RatingValue[] = [
  { id: '1', label:'No', value:0 },
  { id: '2', label:'Ep', value:0.5 },
  { id: '3', label:'Sí', value:1 },
];

export type RatingValue = {
  id:string;
  label:string;
  value:number;
}