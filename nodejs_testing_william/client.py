#E:\Program\Arbeit\Python27
# -*- coding: utf-8 -*-
import requests #http://www.python-requests.org/en/latest/user/install/

#from urllib2 import Request, urlopen, URLError, HTTPError

def push(filename, urlname):
    try:
        with open(filename):pass
    except IOError:
        print filename + ' does not exist'

    files = {'file': open(filename, 'rb')}
    r = requests.post(urlname, files=files)
    r.text
    print r
def main():

    url = 'http://localhost:8080'
    files = {'file': open('helloworldserver.js', 'rb')}

    r = requests.post(url, files=files)
    r.text

    
