import requests
from bs4 import BeautifulSoup
import math

content = ""

header = ({'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
          'Accepted-Language': 'en-US,en;q=0.5'})

def goFetchIt(url):
    response = requests.get(url, headers=header)
    if response.status_code == 200:
        html = response.text
        return html
    else:
        return "Failed to retrieve the web page."


def retriever(url_string):
    html_texts = goFetchIt(url_string)  # The fetch request
    soup = BeautifulSoup(html_texts, 'lxml')
    totalReview = soup.find("div", class_ = "Ci").text
    totalReview = int(totalReview.split(" ")[-1].replace(",",""))
    totalReviewPages = math.ceil(totalReview/10)
    getAbout(soup)
    global content
    content += "\nReviews\n"
    num = 0
    urlList = url_string.split("Reviews-")
    while num <= totalReviewPages*10:
        if num == 0:
            getReviews(url_string)
        else:
            url = f"{urlList[0]}Reviews-or{num}-{urlList[1]}"
            getReviews(url)
        num += 10
    getTravels(soup)
    

def getAbout(soup):
    element = soup.find("span", class_ = "JguWG")
    global content
    content += f"About\n{element.text}\n"

def getTravels(soup):
    global content
    content += "Travelers\n"
    for element in soup.find_all("span", class_ = "JguWG"):
        try:
            if element.find("div", class_ = "biGQs _P pZUbB KxBGd"):
                content += element.find("div", class_ = "biGQs _P pZUbB KxBGd").text
                content += "\n"
        except:
            pass

def getReviews(url_string):
    html_texts = goFetchIt(url_string)  # The fetch request
    soup = BeautifulSoup(html_texts, 'lxml')
    global content
    count = 0
    for element in soup.find_all("span", class_ = "JguWG"):
        count += 1
        try:
            if element.find("span", class_ = "yCeTE"):
                content += element.find("span", class_ = "yCeTE").text
                content += "\n\n"
        except:
            pass


def wikiScraper(url_string):
    retriever(url_string)
    global content
    return content


if __name__ == "__main__":
    text = wikiScraper("https://www.tripadvisor.com/Attraction_Review-g47088-d7209454-Reviews-Plaza_Antiques-Las_Vegas_New_Mexico.html")
    print(text)
    with open("content.txt", "w") as file:
        file.write(content)