export interface IgoogleSearch {
    kind: string;
    url: Url;
    queries: Queries;
    context: Context;
    searchInformation: SearchInformation;
    items: Igoogleitem[];
  }
  
  export interface Igoogleitem {
    kind: string;
    title: string;
    htmlTitle: string;
    link: string;
    displayLink: string;
    snippet: string;
    htmlSnippet: string;
    formattedUrl: string;
    htmlFormattedUrl: string;
    pagemap: Pagemap;
  }
  
  export  interface Pagemap {
    cse_thumbnail: Csethumbnail[];
    metatags: Metatag[];
    cse_image: Cseimage[];
  }
  
  export  interface Cseimage {
    src: string;
  }
  
  export  interface Metatag {
    'product:original_price:amount': string;
    'og:image': string;
    'theme-color': string;
    'og:site_name': string;
    'product:price:amount': string;
    'msapplication-tileimage': string;
    'og:description': string;
    'be:norm_url': string;
    'be:sdk_type': string;
    'be:capsule_url': string;
    'product:original_price:currency': string;
    'be:timer': string;
    'be:messages': string;
    'msapplication-tilecolor': string;
    'og:type': string;
    'be:sdk': string;
    'og:title': string;
    viewport: string;
    'product:price:currency': string;
    'be:api_dt': string;
    'product:retailer_item_id': string;
    'be:mod_dt': string;
    'og:url': string;
    'be:orig_url': string;
    'format-detection': string;
  }
  
  export  interface Csethumbnail {
    src: string;
    width: string;
    height: string;
  }
  
  export  interface SearchInformation {
    searchTime: number;
    formattedSearchTime: string;
    totalResults: string;
    formattedTotalResults: string;
  }
  
  export  interface Context {
    title: string;
  }
  
  export  interface Queries {
    request: Request[];
    nextPage: Request[];
  }
  
  export  interface Request {
    title: string;
    totalResults: string;
    searchTerms: string;
    count: number;
    startIndex: number;
    inputEncoding: string;
    outputEncoding: string;
    safe: string;
    cx: string;
  }
  
  export  interface Url {
    type: string;
    template: string;
  }