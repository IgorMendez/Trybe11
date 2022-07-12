from tech_news.database import get_collection


# Requisito 10
def top_5_news():
    get = get_collection().aggregate(
        [
            {
                "$project": {
                    "_id": 0,
                    "title": 1,
                    "url": 1,
                    "popularity": {
                        "$sum": ["$shares_count", "$comments_count"]
                    },
                }
            },
            {"$sort": {"popularity": -1}},
            {"$unset": "popularity"},
            {
                "$limit": 5,
            },
        ]
    )
    n_tulpa = [new for new in get]
    return [(new["title"], new["url"]) for new in n_tulpa]


# Requisito 11
def top_5_categories():
    get = get_collection().aggregate(
        [
            {"$project": {"categories": 1}},
            {"$unwind": "$categories"},
            {"$group": {"_id": "$categories", "count": {"$sum": 1}}},
            {"$sort": {"_id": 1}},
            {"$limit": 5},
        ]
    )
    return [category["_id"] for category in get]
