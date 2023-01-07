export type Language = "Python"|"Javascript"|"C++"
export type Rating = 1|2|3|4|5
export type MinutesSpent = number & { __isPositive: true };
export type Button = "button" | "submit" | "reset"
export interface IUser {
    first_name:string,
    surname:string,
    id:number //ZMĚNA Z programmer_id
}
export type Sorting = 
    "from newest"|
    "from oldest"|
    "from best rating"|
    "from worst rating"|
    "from shortest"|
    "from longest"|
    "no sorting"

export interface IDiaryEntry {
    datetime:string //ZMĚNA Z date
    programming_language:Language
    minutes_spent:MinutesSpent
    rating:Rating
    description:string
    programmer_id?:number
    id:number //ZMĚNA z record_id
}