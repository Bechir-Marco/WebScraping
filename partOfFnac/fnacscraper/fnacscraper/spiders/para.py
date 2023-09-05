import scrapy
from fnacscraper.items import BookItem
from urllib.parse import urljoin


class ParaSpider(scrapy.Spider):
    name = "para"
    allowed_domains = ["parapharmacie.tn"]
    start_urls = ["https://parapharmacie.tn/"]

    def start_requests(self):
        urls = [
            "https://parapharmacie.tn/product-category/visage/page/{pageNum}"
            "https://parapharmacie.tn/product-category/cheveux/page/{pageNum}",
            "https://parapharmacie.tn/product-category/corps/page/{pageNum}",
            "https://parapharmacie.tn/product-category/solaires/page/{pageNum}",
            "https://parapharmacie.tn/product-category/bebe-et-maman/page/{pageNum}",
            "https://parapharmacie.tn/product-category/complements-alimentaires/page/{pageNum}",
            "https://parapharmacie.tn/product-category/materiel-medical/page/{pageNum}"
        ]

        for url in urls:
            if "{pageNum}" in url:
                # URL with dynamic page number
                for pageNum in range(1, 71):  # Or any appropriate range
                    dynamic_url = url.replace("{pageNum}", str(pageNum))
                    print('dyncamic url ',dynamic_url)
                    yield scrapy.Request(url=dynamic_url, callback=self.parse)
            else:
                # URL without dynamic page number
                print(' url ', url)
                yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        books = response.css('ul.products li.product')
        for book in books:
            relative_url = book.css('div.product-body a::attr(href)').get()
           
            yield response.follow(relative_url, callback=self.parse_book_page)

    def parse_book_page(self, response):

        book_item = BookItem()
        book_item["url"] = response.url
        book_item["title"] = response.css(
            '.product_title.entry-title::text').get()
        book_item["category"] = response.css(
            'nav.woocommerce-breadcrumb a:nth-last-child(-n+2)::text').get()

        description_element = response.css(
            '.woocommerce-Tabs-panel--description')

        # Extract and clean the text
        description_text = ' '.join(
            description_element.css('*::text').getall()).strip()
        book_item["description"] = description_text
        book_item["image"] = response.css(".woocommerce-product-gallery__image a::attr(href)").get()

        
        yield book_item
