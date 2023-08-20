import scrapy
from fnacscraper.items import BookItem
from urllib.parse import urljoin


class PolicierthrillerSpider(scrapy.Spider):
    name = "policierThriller"
    allowed_domains = ["www.alkitab.tn"]
    start_urls = ["https://www.alkitab.tn/"]

    def start_requests(self):
        for pageNum in range(1, 3000):
            url = f"https://www.alkitab.tn/listeliv.php?rayon=Policier+%26+Thriller&select_tri_recherche=pertinence&base=allbooks&codegtl1=90000000&page={pageNum}"
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        books = response.css("ul#liste_livres li")
        for book in books:
            relative_url = book.css("h2 a::attr(href)").get()
            absolute_url = urljoin('https://www.alkitab.tn/', relative_url)
            yield response.follow(absolute_url, callback=self.parse_book_page)

    def parse_book_page(self, response):
        book_item = BookItem()
        book_item["url"] = response.url
        book_item["title"] = response.css('h1.titre.mb-01::text').get().strip()
        book_item["category"] = response.css('p#gtlAutresInfos a::text').get()

        description = response.css('p.description::text').get()
        span_content = response.css('p.description span.showResume::text').get()

        combined_content = description + span_content if description and span_content else description

        if not description:
            description = response.xpath(
                'string(//*[starts-with(@id, "product-description-short-")])'
            ).get()

        else:
            combined_content = combined_content.strip()

        book_item["description"] = combined_content

        yield book_item 
