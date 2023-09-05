# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class FnacscraperItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    pass


class BookItem(scrapy.Item):
    url = scrapy.Field()
    title = scrapy.Field()
    category = scrapy.Field()
    description = scrapy.Field()
    price = scrapy.Field()
    image = scrapy.Field()
    fiche_technique = scrapy.Field()
    moreDetails = scrapy.Field()
    details = scrapy.Field()
    taille = scrapy.Field()
    composition = scrapy.Field()
