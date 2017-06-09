import csv

from matplotlib.mlab import PCA
from numpy import genfromtxt
from io import StringIO
import numpy as np

i = 0

data = {}

cities = []
citiesInOrder = []
variables = []

with open('bloomberg.csv', 'r') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        if not(row['metropolitan-areas'] in data):
            data[row['metropolitan-areas']] = {}
            citiesInOrder.append(row['metropolitan-areas'])
        data[row['metropolitan-areas']][row['variables']] = row['Value']


# Leaving only the cities whose metro population is over 3M
for key in citiesInOrder:
    if not('Total land area of the city (km2)' in data[key]):
        continue
    if (int(data[key]['Total population metropolitan area (persons)']) > 2500000):
        cities.append(key)


skip_variables = [
    'Sprawl index',
    'Population, Commuting Zone, Youth (0-14)',
    'PCT patent applications of the metropolitan area as % of national value',
    'GDP per capita annual average growth (%)',
    'Working age population of the core area as a share of total metropolitan area working age population (%)',
    'Population, City, Old (65 more)',
    'Employment annual average growth rate (%)',
    'PCT patent applications (count)',
    'Employment of the metropolitan area as a share of national value (%)',
    'Elderly population of the core area as a share of total metropolitan area elderly population (%)',
    'GDP annual average growth (%)',
    'Local governments in the core (count)',
    'Urbanised area growth (%)',
    'PCT patent applications annual average growth (%)',
    'Unemployment annual average growth rate (%)',
    'PCT patents applications per 10,000 inhabitants',
    'Labour force annual average growth rate (%)',
    'GDP per employe annual average growth (%)',
    'Population annual average growth rate (%)'
    'Commuting zone land share over Metropolitan land area (%)',
    'Population, Commuting Zone, Wlder (65more)',
    'Unemployment of the metropolitan area as a share of national value (%)',
    'Average population size of local government',
    'Polycentricity',
    'Population annual average growth rate (%)',
    'Population of the commuting zone area (persons)',
    'Commuting zone land share over Metropolitan land area (%)',
    'Population density of the commutung zone (person per km2)',
    'Population, Commuting Zone, Working age (15-64)',
    'Total land area of the commuting zone (km2)'
]

my_variables = [
    'GDP per capita (US$)',
    'Unemployment as a share of the labour force',
    'Population density (persons per km2)',
    'Green area per million people (square meters per million person)',
    'CO2 emissions per capita (tonnes per inhabitant)',
    'Estimated average exposure to air pollution (PM2.5) based on imagery data',
    'Concentration of population in the core (%)',
    'Urbanised area share (%)',
    'Population of the metropolitan area as a share of national value (%)',
    'Territorial fragmentation',
    'GDP of the metropolitan area as share of national value (%)'
]

for v in my_variables:
    variables.append("\"" + v + "\"")

first_line = ','.join(variables) + ',City'

print(first_line)

for city in cities:
    row = ''
    for v in variables:
        if not(v.replace('"', '') in data[city]):
            row += 'NODATA,'
        else:
            row += data[city][v.replace('"', '')] + ','
    #print(row + city)


test = genfromtxt('data.csv', dtype=None, delimiter=',', skip_header=1, usecols=(0,1,2,3,4,5,6,7,8,9,10))

#print(test)
"""
cities = []
c = 0
for t in test:
    cities.append(t[11])
    print(t[11])
"""
#print(test.shape)

#np.resize(test, (51,12))
print(test.shape)

#z = np.delete(test, 0, axis=1)

#cities = test[:11]
print(test)


pca = PCA(test)

for i in range(0,len(cities)):
    print("%f \t %f" % (pca.Y[i][0], pca.Y[i][1]))
