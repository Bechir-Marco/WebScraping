import scrapy
from fnacscraper.items import BookItem
from urllib.parse import urljoin


class PharmaSpider(scrapy.Spider):
    name = "pharma"
    allowed_domains = ["pharma-shop.tn"]
    start_urls = ["https://pharma-shop.tn/"]

    def start_requests(self):
            urls = [
                "https://pharma-shop.tn/839-visage?page={pageNum}"
                "https://pharma-shop.tn/906-cheveux?page={pageNum}",
                "https://pharma-shop.tn/887-corps?page={pageNum}",
                "https://pharma-shop.tn/928-bebe-et-maman?page={pageNum}",
                "https://pharma-shop.tn/953-complements-alimentaires",
                "https://pharma-shop.tn/987-hygiene?page={pageNum}",
                "https://pharma-shop.tn/1013-solaires?page={pageNum}",
                "https://pharma-shop.tn/1023-bio-naturel?page={pageNum}",
                "https://pharma-shop.tn/1030-materiel-medical?page={pageNum}",
                "https://pharma-shop.tn/871-homme?page={pageNum}"
            ]

            for url in urls:
                if "{pageNum}" in url:
                    # URL with dynamic page number
                    for pageNum in range(1, 80):  # Or any appropriate range
                        dynamic_url = url.replace("{pageNum}", str(pageNum))
                        print('dyncamic url ',dynamic_url)
                        yield scrapy.Request(url=dynamic_url, callback=self.parse)
                else:
                    # URL without dynamic page number
                    print(' url ', url)
                    yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        books = response.css('.product-miniature')
        for book in books:
            relative_url = book.css('div.product-image a::attr(href)').get()
            yield response.follow(relative_url, callback=self.parse_book_page)

    def parse_book_page(self, response):

        book_item = BookItem()
        book_item["url"] = response.url
        book_item["title"] = response.css(
            'div.headerfelx h1::text').get()
        book_item["category"] = response.css(
            'ol[itemtype="http://schema.org/BreadcrumbList"] li:nth-last-child(2) span::text').get()

        description_element = response.css(
            '.product-description')

        # Extract and clean the text
        description_text = ' '.join(
            description_element.css('*::text').getall()).strip()
        book_item["description"] = description_text
        book_item["image"] = response.css(
            'div.product-cover img::attr(src)').get()
        yield book_item
