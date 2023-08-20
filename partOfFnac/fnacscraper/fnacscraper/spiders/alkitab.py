import scrapy
from fnacscraper.items import BookItem
from urllib.parse import urljoin


class AlkitabSpider(scrapy.Spider):
    name = "alkitab"
    allowed_domains = ["alkitab.tn"]
    start_urls = ["https://alkitab.tn"]

    def start_requests(self):
        urls = [
            "https://www.alkitab.tn/listeliv.php?rayon=Litt%C3%A9rature&select_tri_recherche=pertinence&base=allbooks&codegtl1=1000000&page={pageNum}",
            "https://www.alkitab.tn/listeliv.php?rayon=Jeunesse&select_tri_recherche=pertinence&base=allbooks&codegtl1=2000000&page={pageNum}",
            "https://www.alkitab.tn/listeliv.php?rayon=Bandes+dessin%C3%A9es+%2F+Comics+%2F+Mangas&select_tri_recherche=pertinence&base=allbooks&codegtl1=3000000&page={pageNum}",
            "https://www.alkitab.tn/listeliv.php?rayon=Policier+%26+Thriller&select_tri_recherche=pertinence&base=allbooks&codegtl1=90000000&page={pageNum}",
            "https://www.alkitab.tn/listeliv.php?rayon=Fantasy+%26+Science-fiction&select_tri_recherche=pertinence&base=allbooks&codegtl1=91000000&page={pageNum}",
            "https://www.alkitab.tn/listeliv.php?rayon=Vie+pratique+%26+Loisirs&select_tri_recherche=pertinence&base=allbooks&codegtl1=4000000&page={pageNum}",
            "https://www.alkitab.tn/listeliv.php?rayon=Tourisme+%26+Voyages&select_tri_recherche=pertinence&base=allbooks&codegtl1=5000000&page={pageNum}",
            "https://www.alkitab.tn/listeliv.php?rayon=Arts+et+spectacles&select_tri_recherche=pertinence&base=allbooks&codegtl1=6000000&page={pageNum}",
            "https://www.alkitab.tn/listeliv.php?rayon=Religion+%26+Esot%C3%A9risme&select_tri_recherche=pertinence&base=allbooks&codegtl1=7000000&page={pageNum}",
            "https://www.alkitab.tn/listeliv.php?rayon=Entreprise%2C+%C3%A9conomie+%26+droit&select_tri_recherche=pertinence&base=allbooks&codegtl1=8000000&page={pageNum}",
            "https://www.alkitab.tn/listeliv.php?rayon=Sciences+humaines+%26+sociales&select_tri_recherche=pertinence&base=allbooks&codegtl1=9000000&page={pageNum}",
            "https://www.alkitab.tn/listeliv.php?rayon = Sciences+%26+Techniques & select_tri_recherche = pertinence & base = allbooks & codegtl1 = 10000000 & page = {pageNum}",
            "https://www.alkitab.tn/listeliv.php?rayon=Scolaire&select_tri_recherche=pertinence&base=allbooks&codegtl1=11000000&page={pageNum}",
            "https://www.alkitab.tn/listeliv.php?rayon=Parascolaire&select_tri_recherche=pertinence&base=allbooks&codegtl1=12000000&page={pageNum}",
            "https://www.alkitab.tn/listeliv.php?rayon=Dictionnaires+%2F+Encyclop%C3%A9dies+%2F+Documentation&select_tri_recherche=pertinence&base=allbooks&codegtl1=13000000&page={pageNum}"
        ]

        for url in urls:
            if "{pageNum}" in url:
                # URL with dynamic page number
                for pageNum in range(1, 3001):  # Or any appropriate range
                    dynamic_url = url.replace("{pageNum}", str(pageNum))
                    yield scrapy.Request(url=dynamic_url, callback=self.parse)
            else:
                # URL without dynamic page number
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
        book_item["image"] = response.css(
            '#img_detailRecto img::attr(src)').get()

        description = response.css('p.description::text').get()
        span_content = response.css(
            'p.description span.showResume::text').get()

        combined_content = description + \
            span_content if description and span_content else description

        if not description:
                description = response.xpath(
                    'string(//*[starts-with(@id, "product-description-short-")])'
                ).get()

        else:
                combined_content = combined_content.strip()

        book_item["description"] = combined_content

        yield book_item
