# Requisito 1
from parsel import Selector
from tech_news.database import create_news
import requests
import time


def fetch(url):
    try:
        get_request = requests.get(url)
        time.sleep(1)
        if (get_request.status_code == 200):
            return get_request.text
    except (requests.Timeout, requests.HTTPError):
        return None


# Requisito 2
def scrape_novidades(html_content: str):
    selector = Selector(html_content)
    css = '.tec--list__item .tec--card__title__link::attr("href")'
    url = selector.css(css).getall()
    return url


# Requisito 3
def scrape_next_page_link(html_content: str):
    selector = Selector(html_content)
    css = '.tec--btn::attr("href")'
    url = selector.css(css).get()
    return url


def get_shares(s):
    count_shares = 0
    if s:
        count_shares = int(s.split()[0])
        return count_shares
    else:
        count_shares = 0
        return count_shares


# Requisito 4
def scrape_noticia(html_content: str):
    selector = Selector(html_content)
    shares = get_shares(selector.css('.tec--toolbar__item::text').get())
    comments = selector.css(
            "button#js-comments-btn::attr(data-count)"
            ).get()
    categories = selector.css('#js-categories a::text').getall()
    oi = ".z--mb-16 h2.z--text-base.z--font-semibold ~ div a.tec--badge::text"
    sourcers = selector.css(oi).getall()
    categories_list = []
    sources_list = []
    summary = selector.css(
        ".tec--article__body > p:first-child *::text"
    ).getall()
    sumario = ''
    if summary:
        sumario = ''.join(summary)
    else:
        sumario = ''
    for source in sourcers:
        sources_list.append(source.strip())
    for categorie in categories:
        categories_list.append(categorie.strip())
    writer = selector.css("div[class*='author'] p *::text").get()
    if not writer:
        writer = selector.css("a[href*=autor]::text").get()
    elements = {
        "url": selector.css("meta[property*='url']::attr(content)").get(),
        "title": selector.css('#js-article-title::text').get(),
        "timestamp": selector.css('#js-article-date::attr("datetime")').get(),
        "writer": writer.strip() if writer else writer,
        "shares_count": shares,
        "comments_count": int(comments),
        "summary": sumario,
        "sources": sources_list,
        "categories":  categories_list,
    }
    return elements


# Requisito 5
# Peguei do parceiro https://github.com/tryber/sd-011-tech-news/pull/85/files
def get_tech_news(amount):
    BASE_URL = 'https://www.tecmundo.com.br/novidades'

    current_page = BASE_URL
    news = []
    while len(news) < amount:
        current_html = fetch(current_page)
        news_urls = scrape_novidades(current_html)

        for url in news_urls:
            if len(news) == amount:
                break
            news_html = fetch(url)
            news.append(scrape_noticia(news_html))
        current_page = scrape_next_page_link(current_html)
    create_news(news)
    return news
