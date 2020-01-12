import mechanicalsoup

def findDeals(url):
    browser = mechanicalsoup.StatefulBrowser()
    browser.open(url)
    offers = browser.get_current_page().find("section", {"id":"offers"}).find_all('li')
    deals = []
    for offer in offers:
        deal = {}

        deal['restaurant'] = offer['data-dealer-name'].strip()
        deal['image'] = 'https:' + offer.find('a', {'class':'offer_image'}).find('img')['src']
        deal['rfgLink'] = 'https://www.redflagdeals.com' + offer.find('a', {'class':'offer_title'})['href']

        browser.open(deal['rfgLink'])
        page = browser.get_current_page()
        details = page.find('div', {'id':'details'})
        deal['title'], deal['description'] = [el.strip() for el in details.find('span', {'class', 'show_long_title'}).text.split(':')]
        deal['url'] = details.find('a', {'class': 'get_offer'})['href']
        
        dates = page.find('div', {'id':'offer_meta'}).find('div', {'class':'dates'}).find('label', {'for':'expires'}).findNext('time')
        deal['expires'] = {'datetime':dates['datetime'], 'display':dates.text.strip()}
        # for el in ['posted','starts','expires']:
        #     deal[el] = {}
        #     datetime = dates.find('label', {'for': el}).findNext('time')
        #     deal[el]['datetime'], deal[el]['display'] = datetime['datetime'], datetime.text.strip()
            
        try:
            if deal['restaurant'] == 'McDonalds':
                extras = page.find('div',{'id':'description'}).find_all('ul')[1].find_all('a')
            elif deal['restaurant'] == 'KFC':
                extras = page.find('div',{'id': 'description'}).find_all('ul')[1].find_all('li')

            for item in extras:
                copy = {}
                for key in deal:
                    copy[key] = deal[key]
                if deal['restaurant'] == 'McDonalds':
                    copy['url'] = item['href']
                copy['description'] = item.text.strip()
                deals.append(copy)
        except Exception:
            deals.append(deal)
    return deals

def goToRests(rests):
    result = []
    urls = {'McDonalds':'https://www.redflagdeals.com/canada/kfc-deals-coupons-sales/', 'KFC':'https://www.redflagdeals.com/canada/mcdonalds-deals-coupons-sales/', 'Harveys':'https://www.redflagdeals.com/canada/harveys-deals-coupons-sales/'}

    for rest in rests:
        if rest in urls:
            result += findDeals(urls[rest])
    return result