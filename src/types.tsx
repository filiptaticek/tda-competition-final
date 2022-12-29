export type Language = "Python"|"Javascript"|"C++"
export type Rating = 0|1|2|3|4|5

export interface IDiaryEntry {
    date:string
    programming_language:Language
    minutes_spent:number
    rating:Rating
    description:string
    record_id:number
}