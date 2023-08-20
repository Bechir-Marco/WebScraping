import scrapy
from fnacscraper.items import BookItem
from urllib.parse import urljoin


class CuisineetelectromenagerSpider(scrapy.Spider):
    name = "cuisineEtElectromenager"
    allowed_domains = ["www.jumia.com.tn"]
    start_urls = ["https://www.jumia.com.tn"]

    def start_requests(self):
        for pageNum in range(1, 51):
            url = f"https://www.jumia.com.tn/cuisine-cuisson/?viewType=grid&page={pageNum}#catalog-listing"
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        books = response.css(".prd._fb")
        for book in books:
            relative_url = book.css("a::attr(href)").get()
            absolute_url = urljoin("https://www.jumia.com.tn/", relative_url)
            print(absolute_url)
            yield response.follow(absolute_url, callback=self.parse_book_page)

    def parse_book_page(self, response):
        book_item = BookItem()
        book_item["url"] = response.url
        book_item["title"] = response.css("h1.-fs20::text").get().strip()
        book_item["category"] = response.css(".brcbs a:nth-last-child(2)::text").get()

        description = response.css(".markup.-mhm").xpath("string()").get().strip()
        description = (
            description.replace("\n", " ")
            .replace("\r", " ")
            .replace("\t", " ")
            .replace("\xa0", " ")
            .replace("\u202f", "")
        )

        combined_content = description

        book_item["description"] = combined_content
        book_item["image"] = response.css("div#imgs a::attr(href)").get()
        yield book_item
