```
Table products {
id string [primary key]
name string
type string[] // Manga | Anime Movie | Anime TV Series | WN/LN
created_at timestamp
updated_at timestamp
}

Table authors {
id string [primary key]
name string
created_at timestamp
updated_at timestamp
}

Table posts {
id string [primary key]
title string
score number
body string // link to html file on server / s3
author_id string
product_id string[]
created_at timestamp
updated_at timestamp
}

Ref: posts.author_id > authors.id
Ref: posts.product_id < products.id

/* filter to get all posts
search?: string
page/offset?: number
limit?: string
types?: string[]
categories?: string[]
start_date?: timestamp
end_date?: timestamp
*/
```
