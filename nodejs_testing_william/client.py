#E:\Program\Arbeit\Python27
# -*- coding: utf-8 -*-
import requests

#from urllib2 import Request, urlopen, URLError, HTTPError

def push(filename, urlname):
    try:
        with open(filename):pass
    except IOError:
        print filename + ' does not exist'

    files = {'file': open(filename, 'rb')}
    r = requests.post(urlname, files=files)
    r.text
    
def main():

    url = 'http://localhost:8080'
    files = {'file': open('helloworldserver.js', 'rb')}

    r = requests.post(url, files=files)
    r.text
    
    # Specify the url
    #url = 'http://localhost:8080'
    #form_data = {'files': 'E:\Dropbox\Skola\D7024E\\nodejs_testing_william\helloworldserver.js'}
    #params = urllib.urlencode(form_data)
    #response = urllib2.urlopen(url, params)
    #print response.read()

    
