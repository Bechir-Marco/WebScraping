import scrapy
from fnacscraper.items import BookItem


class MytekSpider(scrapy.Spider):
    name = "mytek"
    allowed_domains = ["www.mytek.tn"]

    def start_requests(self):
        urls = [
            "https://www.mytek.tn/informatique/ordinateur-de-bureau.html?p={pageNum}",
            "https://www.mytek.tn/informatique/composants-informatique.html?p={pageNum}",
            "https://www.mytek.tn/informatique/tablettes-tactiles.html?p={pageNum}",
            "https://www.mytek.tn/informatique/sacs-scolaires-trousses.html?p={pageNum}",
            "https://www.mytek.tn/informatique/serveurs.html?p={pageNum}",
            "https://www.mytek.tn/informatique/peripheriques-accessoires.html?p={pageNum}",
            "https://www.mytek.tn/informatique/stockage.html?p={pageNum}",
            "https://www.mytek.tn/gaming/accessoires-de-jeux.html?p={pageNum}",
            "https://www.mytek.tn/gaming/composant-pc-gamer.html?p={pageNum}",
            "https://www.mytek.tn/gaming/console-de-jeux.html",
            "https://www.mytek.tn/gaming/peripheriques-et-accessoires-gamers.html?p={pageNum}",
            "https://www.mytek.tn/gaming/gaming-pc.html?p={pageNum}",
            "https://www.mytek.tn/telephonie-tunisie/smartphone-mobile-tunisie.html?p={pageNum}",
            "https://www.mytek.tn/telephonie-tunisie/smartwatch.html?p={pageNum}",
            "https://www.mytek.tn/telephonie-tunisie/accessoires-telephonie.html?p={pageNum}",
            "https://www.mytek.tn/telephonie-tunisie/telephone-fixe.html",
            "https://www.mytek.tn/telephonie-tunisie/appareil-fax.html",
            "https://www.mytek.tn/telephonie-tunisie/lunette-connectee.html",
            "https://www.mytek.tn/electromenager/gros-electromenager.html?p={pageNum}",
            "https://www.mytek.tn/electromenager/preparation-culinaire.html?p={pageNum}",
            "https://www.mytek.tn/electromenager/cafe-et-petit-dejeuner.html?p={pageNum}",
            "https://www.mytek.tn/electromenager/rangement-conservation.html?p={pageNum}",
            "https://www.mytek.tn/electromenager/appareil-de-cuisson.html?p={pageNum}",
            "https://www.mytek.tn/electromenager/fontaine.html",
            "https://www.mytek.tn/electromenager/hygiene-et-soin-maison.html?p={pageNum}",
            "https://www.mytek.tn/electromenager/cuisine.html?p={pageNum}",
            "https://www.mytek.tn/electromenager/glaciere.html",
            "https://www.mytek.tn/image-son/accessoires-projection.html",
            "https://www.mytek.tn/image-son/accessoires-appareil-photo.html",
            "https://www.mytek.tn/image-son/photos-camescopes.html",
            "https://www.mytek.tn/image-son/affichage-et-controle.html",
            "https://www.mytek.tn/image-son/accessoires-televiseurs.html?p={pageNum}",
            "https://www.mytek.tn/image-son/home-cinema.html",
            "https://www.mytek.tn/image-son/son-numerique.html?p={pageNum}",
            "https://www.mytek.tn/image-son/piles-et-chargeurs.html?p = {pageNum}",
            "https://www.mytek.tn/image-son/recepteurs-numeriques-abonnement.html?p={pageNum}",
            "https://www.mytek.tn/image-son/instruments-de-musique.html?p={pageNum}",
            "https://www.mytek.tn/image-son/lecteur-enregistreur.html",
            "https://www.mytek.tn/image-son/projection.html?p={pageNum}",
            "https://www.mytek.tn/image-son/televiseurs.html?p={pageNum}",
            "https://www.mytek.tn/maison-bricolage/bricolage-jardin.html?p={pageNum}",
            "https://www.mytek.tn/maison-bricolage/quincaillerie.html",
            "https://www.mytek.tn/maison-bricolage/mobilier-de-jardin.html?p={pageNum}",
            "https://www.mytek.tn/maison-bricolage/rangement-et-organisation.html?p={pageNum}",
            "https://www.mytek.tn/maison-bricolage/decoration.html?p={pageNum}",
            "https://www.mytek.tn/maison-bricolage/plomberie-et-sanitaire.html?p={pageNum}",
            "https://www.mytek.tn/maison-bricolage/luminaire-eclairage.html?p={pageNum}",
            "https://www.mytek.tn/maison-bricolage/animalerie.html?p={pageNum}",
            "https://www.mytek.tn/maison-bricolage/linge-de-maison.html",
            "https://www.mytek.tn/maison-bricolage/filtration-de-l-eau.html",
            "https://www.mytek.tn/maison-bricolage/maison.html?p={pageNum}",
            "https://www.mytek.tn/impression/consommables.html?p={pageNum}",
            "https://www.mytek.tn/impression/scanners.html?p={pageNum}",
            "https://www.mytek.tn/impression/photocopieurs.html?p={pageNum}",
            "https://www.mytek.tn/impression/imprimantes.html?p={pageNum}",
            "https://www.mytek.tn/reseaux-securite/cables-adaptateurs.html?p={pageNum}",
            "https://www.mytek.tn/reseaux-securite/logiciels.html",
            "https://www.mytek.tn/reseaux-securite/reseaux.html?p={pageNum}",
            "https://www.mytek.tn/reseaux-securite/onduleurs.html?p={pageNum}",
            "https://www.mytek.tn/reseaux-securite/equipement-electricite.html",
            "https://www.mytek.tn/reseaux-securite/materiel-de-securite-biometrie.html",
            "https://www.mytek.tn/reseaux-securite/videosurveillance.html?p = {pageNum}",
            "https://www.mytek.tn/bureautique/ecriture-correction.html?p={pageNum}",
            "https://www.mytek.tn/bureautique/accessoires-de-bureau.html?p={pageNum}",
            "https://www.mytek.tn/bureautique/abonnement-educatif.html",
            "https://www.mytek.tn/bureautique/materiel-point-de-vente.html?p={pageNum}",
            "https://www.mytek.tn/bureautique/tableaux.html?p={pageNum}",
            "https://www.mytek.tn/bureautique/mobilier-de-bureau.html?p={pageNum}",
            "https://www.mytek.tn/bureautique/classements-archivages.html?p={pageNum}",
            "https://www.mytek.tn/bureautique/scolaire.html?p={pageNum}",
            "https://www.mytek.tn/bureautique/fourniture-de-bureau.html?p={pageNum}",
            "https://www.mytek.tn/bureautique/livres-et-parascolaires.html?p={pageNum}",
            "https://www.mytek.tn/bureautique/papier.html?p={pageNum}",
            "https://www.mytek.tn/mode-beaute-sante/bijouterie.html?p={pageNum}",
            "https://www.mytek.tn/mode-beaute-sante/hygiene-soin-beaute.html?p={pageNum}",
            "https://www.mytek.tn/mode-beaute-sante/parfums.html?p={pageNum}",
            "https://www.mytek.tn/mode-beaute-sante/soins-homme.html?p={pageNum}",
            "https://www.mytek.tn/mode-beaute-sante/sacs-bagages.html?p={pageNum}",
            "https://www.mytek.tn/mode-beaute-sante/soins-femme.html?p={pageNum}",
            "https://www.mytek.tn/mode-beaute-sante/sante.html?p={pageNum}",
            "https://www.mytek.tn/mode-beaute-sante/epilation.html?p={pageNum}",
            "https://www.mytek.tn/mode-beaute-sante/massage-bien-etre.html",
            "https://www.mytek.tn/mode-beaute-sante/orthopedie.html",
            "https://www.mytek.tn/sports-loisirs/bicyclettes.html?p={pageNum}",
            "https://www.mytek.tn/sports-loisirs/auto-moto.html",
            "https://www.mytek.tn/sports-loisirs/accessoires-voiture.html?p={pageNum}",
            "https://www.mytek.tn/sports-loisirs/glisse-urbaine.html?p={pageNum}",
            "https://www.mytek.tn/sports-loisirs/entretien-et-nettoyant-auto.html",
            "https://www.mytek.tn/sports-loisirs/sports.html?p={pageNum}",
            "https://www.mytek.tn/sports-loisirs/nutrition-sportive.html",
            "https://www.mytek.tn/sports-loisirs/randonnee-et-camping.html",
            "https://www.mytek.tn/jeux-jouets/jeux-de-construction.html?p={pageNum}",
            "https://www.mytek.tn/jeux-jouets/jeux-educatifs-et-de-societe.html?p={pageNum}",
            "https://www.mytek.tn/jeux-jouets/vehicules-et-voitures.html?p={pageNum}",
            "https://www.mytek.tn/jeux-jouets/loisirs-creatifs.html?p={pageNum}",
            "https://www.mytek.tn/jeux-jouets/jeux-de-table.html",
            "https://www.mytek.tn/jeux-jouets/poupees-poupons.html?p={pageNum}",
            "https://www.mytek.tn/jeux-jouets/jouets-d-imitation.html?p={pageNum}",
            "https://www.mytek.tn/jeux-jouets/jeux-de-plein-air.html?p={pageNum}",
            "https://www.mytek.tn/bebe/bebe-se-promene.html?p={pageNum}",
            "https://www.mytek.tn/bebe/bebe-s-eveille.html?p={pageNum}",
            "https://www.mytek.tn/bebe/bebe-mange.html?p={pageNum}",
            "https://www.mytek.tn/bebe/bebe-dort.html?p={pageNum}",
            "https://www.mytek.tn/bebe/toilette-soin-de-bebe.html",
            "https://www.mytek.tn/bebe/bebe-en-securite.html",
            "https://www.mytek.tn/bebe/coffrets-nouveau-ne.html",
            "https://www.mytek.tn/bebe/grossesse-et-allaitement.html",
            "https://www.mytek.tn/magazine/sport.html",
            "https://www.mytek.tn/magazine/jeunesse.html",
            "https://www.mytek.tn/magazine/loisirs.html",
            "https://www.mytek.tn/informatique/ordinateurs-portables.html?p={pageNum}"
            "https://www.mytek.tn/sports-loisirs/sports.html?p={pageNum}"
        ]

        for url in urls:
            if "{pageNum}" in url:
                # URL with dynamic page number
                pageNum = 1
                dynamic_url = url.replace("{pageNum}", str(pageNum))
                yield scrapy.Request(url=dynamic_url, callback=self.parse, meta={'pageNum': pageNum})
            else:
                # URL without dynamic page number
                yield scrapy.Request(url=url, callback=self.parse)


    def parse(self, response):
            products = response.css(
            "ol.products.list.items.product-items > li.item.product.product-item")
            for product in products:
                relative_url = product.css("a::attr(href)").get()
                yield response.follow(relative_url, callback=self.parse_book_page)

            next_button = response.css(".pages-item-next a")
            if next_button:
                next_url = next_button.css("::attr(href)").get()
                pageNum = response.meta['pageNum'] + 1
                yield response.follow(next_url, callback=self.parse, meta={'pageNum': pageNum})


    

    def parse_book_page(self, response):
        book_item = BookItem()
        book_item["url"] = response.url
        book_item["title"] = response.css(
            '.page-title-wrapper.product h1 span::text').get()
        book_item["category"] = response.css(
            ".items li:nth-last-child(2) span::text").get()

        description = response.css(
            ".value p::text, .value p span::text").getall()
        combined_description = ' '.join(description)
        book_item["description"] = combined_description
        book_item["image"] = response.css(
            ".product.media img::attr(src)").get()

        data_rows = response.xpath(
            "//table[@id='product-attribute-specs-table']//tr")
        fiche_technique = {}

        for row in data_rows:
            label = row.xpath(".//th/text()").get()
            value = row.xpath(".//td/text()").get()

            # Remove leading/trailing whitespace and convert non-breaking spaces to regular spaces
            label = label.strip().replace('\xa0', ' ')
            value = value.strip().replace('\xa0', ' ')

            fiche_technique[label] = value

        formatted_text_ficheTechnique = "\n".join(
            f"{label}: {value}" for label, value in fiche_technique.items())
        book_item["fiche_technique"] = formatted_text_ficheTechnique

        yield book_item
