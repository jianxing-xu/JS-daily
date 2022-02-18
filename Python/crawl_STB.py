import requests
from lxml import etree


res = requests.get("http://aavtv.com/play/41563-4-14/")

hrefs = ["http://aavtv.com/play/41563-3-1/", "http://aavtv.com/play/41563-3-2/", "http://aavtv.com/play/41563-3-3/", "http://aavtv.com/play/41563-3-4/", "http://aavtv.com/play/41563-3-5/", "http://aavtv.com/play/41563-3-6/", "http://aavtv.com/play/41563-3-7/", "http://aavtv.com/play/41563-3-8/", "http://aavtv.com/play/41563-3-9/", "http://aavtv.com/play/41563-3-10/", "http://aavtv.com/play/41563-3-11/", "http://aavtv.com/play/41563-3-12/", "http://aavtv.com/play/41563-3-13/", "http://aavtv.com/play/41563-3-14/", "http://aavtv.com/play/41563-3-15/", "http://aavtv.com/play/41563-3-16/", "http://aavtv.com/play/41563-3-17/", "http://aavtv.com/play/41563-3-18/", "http://aavtv.com/play/41563-3-19/", "http://aavtv.com/play/41563-3-20/", "http://aavtv.com/play/41563-3-21/", "http://aavtv.com/play/41563-3-22/", "http://aavtv.com/play/41563-3-23/", "http://aavtv.com/play/41563-3-24/", "http://aavtv.com/play/41563-3-25/", "http://aavtv.com/play/41563-3-26/", "http://aavtv.com/play/41563-3-27/", "http://aavtv.com/play/41563-3-28/", "http://aavtv.com/play/41563-3-29/", "http://aavtv.com/play/41563-3-30/", "http://aavtv.com/play/41563-3-31/", "http://aavtv.com/play/41563-3-32/", "http://aavtv.com/play/41563-3-33/", "http://aavtv.com/play/41563-3-34/", "http://aavtv.com/play/41563-3-35/", "http://aavtv.com/play/41563-3-36/", "http://aavtv.com/play/41563-3-37/", "http://aavtv.com/play/41563-3-38/", "http://aavtv.com/play/41563-3-39/", "http://aavtv.com/play/41563-3-40/"]

for i in hrefs:
  resp = requests.get(i)
  html = etree.parse(resp.content)
  vSrc = html.xpath('//td[id="playleft"]/iframe/@src')
  print(vSrc)


# print("SSSSSSSSSS________SSSSSS")
# print(hreflist)
# print("EEEEEEEEEE________EEEEEE")



