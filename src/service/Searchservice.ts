import { getdata } from "./basicservice"

const GOOGLE_SEARCH_API = "https://www.googleapis.com/customsearch/v1"


export const SerchapiGoogle = async <T> (search:string,pagenumber:number) => {
    const response = getdata<T>(GOOGLE_SEARCH_API,{
        params: {
          q: search,
          key: "AIzaSyBNJRjKp6YPUbhlUBqI_b_91NcBGYuNJ_I",
          cx: "671aa029c22194a16",
          start:pagenumber,
        },
      } 
    )
    return response
}





// AIzaSyDSVPcXf9tWBhaFm2kI7qT7KVJFj24JhYw