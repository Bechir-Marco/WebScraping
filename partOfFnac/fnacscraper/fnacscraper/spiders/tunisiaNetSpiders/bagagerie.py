import scrapy
from fnacscraper.items import BookItem


class BagagerieSpider(scrapy.Spider):
    name = "bagagerie"
    allowed_domains = ["www.tunisianet.com.tn"]
    start_urls = ["https://www.tunisianet.com.tn"]

    def start_requests(self):
        for pageNum in range(1, 41):
            url = f"https://www.tunisianet.com.tn/623-bagageries"
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        books = response.css("div.item-product.col-xs-12")
        for book in books:
            relative_url = book.css("h2 a::attr(href)").get()
            yield response.follow(relative_url, callback=self.parse_book_page)

    def parse_book_page(self, response):
        book_item = BookItem()
        book_item["url"] = response.url
        book_item["title"] = response.css(".row.probg h1::text").get()
        h1_text = response.css(".row.probg h1::text").get()
        extracted_text = response.xpath('//*[@id="wrapper"]/div/div/nav/ol/li[3]/a/span/text()').get()
        book_item["category"] = extracted_text

        description = response.css(".product-information p::text").extract()
        if not description:
            description = response.xpath(
                'string(//*[starts-with(@id, "product-description-short-")])'
            ).get()

        else:
            description = " ".join(description)

        book_item["description"] = description

        book_item["image"] = response.css(
            'meta[property="og:image"]::attr(content)'
        ).get()
        yield book_item
