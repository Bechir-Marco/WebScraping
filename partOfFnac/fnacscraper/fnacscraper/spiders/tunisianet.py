import scrapy
from fnacscraper.items import BookItem


class TunisianetSpider(scrapy.Spider):
    name = "tunisianet"
    allowed_domains = ["www.tunisianet.com.tn"]
    start_urls = ["https://www.tunisianet.com.tn"]

    def start_requests(self):
        urls = [
            "https://www.tunisianet.com.tn/314-cle-usb-tunisie?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/315-carte-memoire-tunisie?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/649-accessoires-de-bureau?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/469-accessoires-pour-stockage?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/378-accessoire-telephonie-mobile-tunisie?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/481-fournitures-scolaires-en-ligne?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/370-appareil-photo-tunisie?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/623-bagageries",
            "https://www.tunisianet.com.tn/301-pc-portable-tunisie?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/701-ordinateur-de-bureau?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/349-cable-connectique-informatique?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/589-cahier-bloc-feuille-note?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/449-calculatrice-tunisie?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/553-chauffage-tunisie?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/501-fourniture-classement-archivage-tunisie?page={pageNum}",
            "https://www.tunisianet.com.tn/457-climatiseur-tunisie-chaud-froid?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/724-coffrets-et-accessoires",
            "https://www.tunisianet.com.tn/406-composant-informatique?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/466-console-de-jeux?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/317-consommable-imprimante-tunisie?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/676-decoration",
            "https://www.tunisianet.com.tn/669-disques-internes?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/313-disque-dur-externe-tunisie",
            "https://www.tunisianet.com.tn/475-fourniture-ecriture-scolaire-tunisie?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/563-gros-electromenager-lavage?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/521-electromenager-tunisie?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/522-petit-electromenager-tunisie-cuisine?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/524-entretien-soin?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/316-imprimante-en-tunisie?page={pageNum}",
            "https://www.tunisianet.com.tn/723-instrument-de-musique",
            "https://www.tunisianet.com.tn/385-logiciels-informatique-tunisie",
            "https://www.tunisianet.com.tn/490-materiel-point-de-vente?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/509-videosurveillance-tunisie?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/499-nettoyage",
            "https://www.tunisianet.com.tn/700-accessoires-et-peripheriques?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/444-photocopieur-tunisie?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/484-piles-et-chargeurs-tunisie?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/402-recepteur-abonnement",
            "https://www.tunisianet.com.tn/438-reseau?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/326-scanner-informatique?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/705-scooter-electriques",
            "https://www.tunisianet.com.tn/375-serveur-informatique-tunisie?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/389-serveur-stockage-tunisie",
            "https://www.tunisianet.com.tn/596-smartphone-tunisie?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/650-smartwatch?page={pageNum}&order=product.price.asc",
            'https://www.tunisianet.com.tn/550-montre-homme-femme-tunisie?page={pageNum}&order=product.price.asc',
            "https://www.tunisianet.com.tn/684-son?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/709-systeme-d-alarme",
            "https://www.tunisianet.com.tn/572-tableau-bureautique-tunisie?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/396-tablette-tactile-tunisie?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/377-telephone-portable-tunisie?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/369-vente-tv-samsung-led-tunisie?page={pageNum}&order=product.price.asc",
            "https://www.tunisianet.com.tn/713-ventilateur-tunisie",
            "https://www.tunisianet.com.tn/368-videoprojecteurs?page={pageNum}",
            "https://www.tunisianet.com.tn/462-telephone-fixe",
            "https://www.tunisianet.com.tn/380-onduleur",
            "https://www.tunisianet.com.tn/463-ramette-de-papier?page={pageNum}&order=product.price.asc"
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
        books = response.css("div.item-product.col-xs-12")
        for book in books:
            relative_url = book.css("h2 a::attr(href)").get()
            yield response.follow(relative_url, callback=self.parse_book_page)

    def parse_book_page(self, response):
        book_item = BookItem()
        book_item["url"] = response.url
        book_item["title"] = response.css(".row.probg h1::text").get()
        h1_text = response.css(".row.probg h1::text").get()
        extracted_text = response.xpath('//*[@id="wrapper"]/div/div/nav/ol/li[4]/a/span/text()').get()
        if extracted_text is None:
            extracted_text = response.xpath('//*[@id="wrapper"]/div/div/nav/ol/li[3]/a/span/text()').get()

        book_item["category"] = extracted_text

        fiche_technique = (
            response.css(".data-sheet dt.name, .data-sheet dd.value")
            .xpath("string()")
            .extract()
        )
        result = []
        for i in range(0, len(fiche_technique), 2):
            name = fiche_technique[i]
            value = fiche_technique[i + 1]
            result.append(f"{name}: {value}")

        result_array = ", ".join(result)
        book_item["fiche_technique"] = result_array

        text = response.xpath("//div[@class='product-d']//text()").getall()
            
        desired_text = " ".join(text).strip()
        data = []
        table_rows = response.css("table tr")

        for row in table_rows:
            row_data = row.css("td::text").getall()
            formatted_data = [text.strip() for text in row_data if text.strip()]
            data.append(formatted_data)

        merged_data = [desired_text] + data
        book_item["moreDetails"] = merged_data

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
