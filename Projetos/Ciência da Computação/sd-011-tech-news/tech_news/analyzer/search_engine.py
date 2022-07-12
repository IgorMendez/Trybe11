from tech_news.database import find_news
from tech_news.database import search_news
from datetime import datetime


# Requisito 6
def search_by_title(title):
    g_news = find_news()
    n_filter = [new for new in g_news if new["title"].lower() == title.lower()]
    return [(new["title"], new["url"]) for new in n_filter]


# Requisito 7
def search_by_date(date):
    format_data = "%Y-%m-%d"
    get_all = search_news({})
    try:
        datetime.strptime(date, format_data)
        n_filter = [
            new
            for new in get_all
            if str(
                datetime.strptime(new["timestamp"].split("T")[0], format_data)
            )
            == str(datetime.strptime(date, format_data)).split("T")[0]
        ]
        return [(new["title"], new["url"]) for new in n_filter]
    except ValueError:
        raise ValueError("Data inválida")


# Requisito 8
def search_by_source(source):
    get_all = search_news({"sources": {"$regex": source, "$options": "i"}})
    n_tulpa = [new for new in get_all]
    return [(new["title"], new["url"]) for new in n_tulpa]


# Requisito 9
def search_by_category(category):
    get_all = search_news(
        {"categories": {"$regex": category, "$options": "i"}}
    )
    n_tulpa = [new for new in get_all]
    return [(new["title"], new["url"]) for new in n_tulpa]
