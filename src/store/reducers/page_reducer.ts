export type Page = "home"|"all_entries"|"users"|"tags"

export const pageReducer = (state:Page="home", action:any) => {
  switch (action.type) {
  case "SET_PAGE":{
    return (action.page)
  }
  default:
    return state
  }
}