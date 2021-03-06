import mechanicalsoup

browser = mechanicalsoup.StatefulBrowser()

def findDeals(url):
    browser.open(url)
    offers = browser.get_current_page().find("section", {"id":"offers"}).find_all('li')
    deals = []
    for offer in offers:
        deal = {}

        deal['restaurant'] = offer['data-dealer-name'].strip()
        deal['image'] = 'https:' + offer.find('a', {'class':'offer_image'}).find('img')['src']
        link = offer.find('a', {'class':'offer_title'})['href']
        deal['rfgLink'] = 'https://www.redflagdeals.com' + link

        #browser.open(deal['rfgLink'])
        browser.follow_link(link)
        page = browser.get_current_page()
        details = page.find('div', {'id':'details'})
        deal['title'], deal['description'] = [el.strip() for el in details.find('span', {'class', 'show_long_title'}).text.split(':', 1)]
        deal['url'] = details.find('a', {'class': 'get_offer'})['href']
        
        dates = page.find('div', {'id':'offer_meta'}).find('div', {'class':'dates'}).find('label', {'for':'expires'}).findNext('time')
        deal['expires'] = {'datetime':dates['datetime'], 'display':dates.text.strip()}

        appended = False
        try:
            if deal['restaurant'] == 'McDonalds':
                extras = page.find('div',{'id':'description'}).find_all('ul')[1].find_all('a')
            elif deal['restaurant'] == 'KFC':
                extras = page.find('div',{'id': 'description'}).find_all('ul')[1].find_all('li')
            elif deal['restaurant'] == 'A & W':
                extras = []
                for ul in page.find('div',{'id':'description'}).find_all('ul'):
                    extras += ul.find_all('a')

            for item in extras:
                copy = {}
                for key in deal:
                    copy[key] = deal[key]
                if deal['restaurant'] == 'McDonalds' or deal['restaurant'] == 'A & W':
                    copy['url'] = item['href']
                copy['description'] = item.text.strip()
                deals.append(copy)
                appended = True
        except:
            deals.append(deal)
            appended = True
        if not appended:
            deals.append(deal)
    return deals

def goToRests(rests):
    result = []
    urls = {'A & W':'https://www.redflagdeals.com/canada/a-and-w-deals-coupons-sales/','McDonalds':'https://www.redflagdeals.com/canada/kfc-deals-coupons-sales/', 'KFC':'https://www.redflagdeals.com/canada/mcdonalds-deals-coupons-sales/', 'Harveys':'https://www.redflagdeals.com/canada/harveys-deals-coupons-sales/'}

    for rest in rests:
        if rest in urls:
            result += findDeals(urls[rest])
    return result