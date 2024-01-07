```
Table short_reviews {
id string [primary key]
name string
type string[] // Manga | Anime Movie | Anime TV Series | WN/LN
categories string[] //romance, action, adventure,...
writer string // id
score number
synopsis string
review string
status string
vote number
created_at timestamp
updated_at timestamp
}

Table writer {
id string [primary key]
avatar string
role string // admin | user
name string
created_at timestamp
updated_at timestamp
}

Table blogs {
id string [primary key]
title string
content string // link to html file (s3/server)
writer string // id
thumbnail string // link to image (s3/server)
created_at timestamp
updated_at timestamp
}

Table comments_blog {
id string [primary key]
content string
writer string // id
blog_id string // id
created_at timestamp
updated_at timestamp
}

Table comments_short_review {
id string [primary key]
content string
writer string // id
short_review_id string // id
created_at timestamp
updated_at timestamp
}
/*
1. get list pagination:{
    total: number,
    data: []
    page/offset: number
    limit: number
    totalPage?: number
}
2. get list short_reviews:
    - search by name, writer, categories, type
    - filter by type, categories, writer, score
    - sort by score, vote, updated_at
*/
```

notes:
fee of paypal (vietnam): 3.9% + 0.3$ (fixed fee) for each transaction
