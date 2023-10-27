from applicationfuntions import web_scrape

content = web_scrape.wikiScraper("https://www.tripadvisor.com/Attraction_Review-g47088-d7209454-Reviews-Plaza_Antiques-Las_Vegas_New_Mexico.html")
with open("content.txt", "w") as file:
        file.write(content)