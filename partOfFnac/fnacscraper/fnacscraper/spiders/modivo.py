import scrapy
from fnacscraper.items import BookItem
from urllib.parse import urljoin


class ModivoSpider(scrapy.Spider):
    name = "modivo"
    allowed_domains = ["modivo.fr"]
    start_urls = ["https://modivo.fr/"]

    def start_requests(self):
        url='https://modivo.fr/c/homme/sport?p={pageNum}'
        

        if "{pageNum}" in url:
                # URL with dynamic page number
                for pageNum in range(1, 400):  # Or any appropriate range
                    dynamic_url = url.replace("{pageNum}", str(pageNum))
                    yield scrapy.Request(url=dynamic_url, callback=self.parse)
        else:
                # URL without dynamic page number
                yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
            books = response.css('.product-list')
            for book in books:
                relative_url = book.css("a::attr(href)").get()
                absolute_url = urljoin("https://modivo.fr/", relative_url)
                print(absolute_url)
                yield response.follow(absolute_url, callback=self.parse_book_page)

    def parse_book_page(self, response):
        book_item = BookItem()
        book_item["url"] = response.url
        book_item["title"] = response.css('.name::text').get().strip()

        # Extract the three sections
        sections = []
        for section_name in ["Détails", "Taille et ajustement", "Composition et entretien"]:
            section = response.xpath(
                f'//h3[text()="{section_name}"]/following-sibling::div[@class="product-qualities is-expanded"]')
            section_details = []
            for quality in section.css('.quality'):
                label = quality.css('.quality-label::text').get().strip()
                value_element = quality.css('.quality-value span::text').get()
                if value_element:
                    value = value_element.strip()
                    section_details.append(f"{label}: {value}")
            sections.append({'name': section_name, 'details': section_details})

        book_item["details"] = sections

        yield book_item
