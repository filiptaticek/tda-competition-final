export type Language = "Python"|"Javascript"|"C++"
export type Rating = 1|2|3|4|5
export type MinutesSpent = number & { __isPositive: true };
export type Button = "button" | "submit" | "reset"
export type Sorting = "from newest" | "from oldest" | "from best rating" | "from worst rating" | "from shortest"| "from longest"| "no sorting"
export type Color = "red" | "orange" | "blue" | "yellow" | "green" | "purple" | "pink"
export interface IDiaryEntry {
    datetime:string
    programming_language:Language
    minutes_spent:MinutesSpent
    rating:Rating
    description:string
    programmer_id:number|null
    id:number
    tag_ids:[number]
}

export interface IUser {
    name:string,
    surname:string,
    id:number
}
export interface ITag {
    name:string,
    color:Color,
    description:string
    id:number
}