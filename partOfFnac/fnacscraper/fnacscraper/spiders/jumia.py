import scrapy
from fnacscraper.items import BookItem
from urllib.parse import urljoin

class JumiaSpider(scrapy.Spider):
    name = "jumia"
    allowed_domains = ["www.jumia.com.tn"]
    start_urls = ["https://www.jumia.com.tn/"]

    def start_requests(self):
        urls = [
            "https://www.jumia.com.tn/telephone-tablette/?page={pageNum}#catalog-listing",
            "https://www.jumia.com.tn/cuisine-cuisson/?page={pageNum}#catalog-listing",
            "https://www.jumia.com.tn/maison-cuisine/?page={pageNum}#catalog-listing",
            "https://www.jumia.com.tn/maison-cuisine-jardin/?page={pageNum}#catalog-listing",
            "https://www.jumia.com.tn/beaute-hygiene-sante/?page={pageNum}#catalog-listing",
            "https://www.jumia.com.tn/electronique/?page={pageNum}#catalog-listing",
            "https://www.jumia.com.tn/epicerie/?page={pageNum}#catalog-listing",
            "https://www.jumia.com.tn/fashion-mode/?page={pageNum}#catalog-listing",
            "https://www.jumia.com.tn/ordinateurs-accessoires-informatique/?page={pageNum}#catalog-listing",
            "https://www.jumia.com.tn/jeux-videos-consoles/?page={pageNum}#catalog-listing",
            "https://www.jumia.com.tn/sports-loisirs/?page={pageNum}#catalog-listing",
            "https://www.jumia.com.tn/terrasse-jardin-exterieur/?page={pageNum}#catalog-listing",
            "https://www.jumia.com.tn/automobile-outils/?page={pageNum}#catalog-listing",
            "https://www.jumia.com.tn/livres-papeterie/?page={pageNum}#catalog-listing",
            "https://www.jumia.com.tn/instruments-musique/?page={pageNum}#catalog-listing",
            "https://www.jumia.com.tn/bebe-puericulture/?page={pageNum}#catalog-listing",
            "https://www.jumia.com.tn/industriel-scientifique/?page={pageNum}#catalog-listing",
            "https://www.jumia.com.tn/deals-billetterie/",
            "https://www.jumia.com.tn/commerce-de-gros/",
            "https://www.jumia.com.tn/animalerie/?page={pageNum}#catalog-listing",
            "https://www.jumia.com.tn/jeux-et-jouets/?page={pageNum}#catalog-listing",
            "https://www.jumia.com.tn/divers/?page={pageNum}#catalog-listing",
            

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

        fiche_technique = response.xpath("//div[@class='row -pas']//article[@class='col8 -pvs']//li//text()").getall()

        formatted_text_ficheTechnique = "\n".join(fiche_technique)
        book_item["fiche_technique"] = formatted_text_ficheTechnique
        yield book_item


        
