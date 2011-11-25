#-*- encoding: gb18030 -*-
import numpy as np
from django.utils import simplejson
import shapelib as shp
from dbfpy import dbf
from pylab import *
'''
测试绿色通道网页提供数据
'''
def aws_point():
    '''
    var bicycleRental = {
        "type": "FeatureCollection",
        "features": [
            {
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -104.9998241,
                        39.7471494
                    ]
                },
                "type": "Feature",
                "properties": {
                    "popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
                },
                "id": 51
            },
    '''
    f = open(r'I:\work\pythonwork\vips\aws_info2.txt','r')
    lines = f.readlines()
    f.close()
    
    
        
    
    point_feature = []
    for line in lines:
        ss = line.split(',')
        
        geo = {"type": "Point","coordinates":[np.float(ss[2]),np.float(ss[3])]}
        ppts = {"popupContent":'test',"stion_id":ss[0],"elev":ss[4],"type":int(ss[5])}
        aa = {"geometry":geo,"type": "Feature","properties":ppts}
        point_feature.append(aa)
    point_featureCollection = {"type": "FeatureCollection","features": point_feature}
    outfile = r'aws_point.js'
    with  open(outfile,mode='w') as f:
        f.write("var aws_point = ")
        simplejson.dump(point_featureCollection,f,indent=2,encoding='utf-8')
        
        

def lilao_polygon():
    '''
    var bicycleRental = {
        "type": "FeatureCollection",
        "features": [
            {
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        -104.9998241,
                        39.7471494
                    ]
                },
                "type": "Feature",
                "properties": {
                    "popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
                },
                "id": 51
            },
    '''
    file=r'0623\ht11062317.shp'

    attrs = test_db(r'0623\ht11062317.dbf')
    
    o_shp = shp.ShapeFile(file)
    info = o_shp.info()
    #print 'info=',info

    rain = []
    poly_feature = []
    for k in range(int(info[0])):
        if 1:
            obj = o_shp.read_object(k)
            d=obj.vertices()
            
            # obj
            #print d,len(d[0])
            pp = []
            
            
            for item  in d[0]:
                #print item
                #print [item[0],item[1]]
                pp.append([item[0],item[1]])
            #print (attrs['stype'])[k],(attrs['rain'])[k]
            geo = {"type": "Polygon","coordinates":[pp]}
            rr = (attrs['rain'])[k]
            #colors = ('#00CC66','#009933','#FFFF00','#FFCC33','#FF6633','#FF0066','#FF00FF','#9966FF','#990099','#6633FF')
            if rr['01H']  >=0.001:
                rain.append(np.float(rr['01H']))
                if rr['01H'] <0.1 :
                    color = '#00CC66'
                if rr['01H'] >=0.1 and rr['01H'] <0.2:
                    color = '#009933'
                if rr['01H'] >=0.2 and rr['01H'] <0.4:
                    color = '#FFFF00'
                if rr['01H'] >=0.4 and rr['01H'] <0.6:
                    color = '#FFCC33'
                if rr['01H'] >=0.6 and rr['01H'] <0.8:
                    color = '#FF6633'
                if rr['01H'] >=0.8 and rr['01H'] <1.0:
                    color = '#FF0066'
                if rr['01H'] >=1.0 and rr['01H'] <2.0:
                    color = '#FF00FF'
                if rr['01H'] >=2.0 and rr['01H'] <3.0:
                    color = '#9966FF'
                if rr['01H'] >=3.0 and rr['01H'] <5.0:
                    color = '#990099'
                if rr['01H'] >=5.0 and rr['01H']<10.0:
                    color = '#6633FF'
                if rr['01H'] >=10.0:
                    color = '#330000'

                ppts = {"popupContent":'polygon',"stype":(attrs['stype'])[k],"rain":(attrs['rain'])[k],\
                     "fid":k,"style":{"fillColor":color,"weight":1.2,"fillOpacity":0.8,"opacity":0.3,"color":"#666666"}}
                aa = {"geometry":geo,"type": "Feature","properties":ppts,"id":k}
                poly_feature.append(aa)
                

    point_featureCollection = {"type": "FeatureCollection","features": poly_feature}
    
    outfile = r'E:\work\personal_research\aicewe\media\lilao\lilao_poly.js'
    with  open(outfile,mode='w') as f:
            f.write("var lilao_poly = ")
            simplejson.dump(point_featureCollection,f,indent=2,encoding='utf-8')
    
    
    #plot(rain)
    n, bins, patches = hist(rain, 50, facecolor='green', alpha=0.9)
    show()

def test_db(file):
    ## create empty DBF, set fields

    db = dbf.Dbf(file)
    stype = []
    rain = [] #积水量
    ii=0
    for rec in db:
        
        
        stype.append(rec[0])
        rain01H = rec['01H']
        rain02H = rec['02H']
        rain03H = rec['03H']
        rain04H = rec['04H']
        rain05H = rec['05H']
        #rain06H = rec['06H']
        rain.append({'01H':rain01H,'02H':rain02H,'03H':rain03H,'04H':rain04H,'05H':rain05H})
        
        ii+=1
    return {'stype':stype,'rain':rain}




        
#aws_point()
lilao_polygon()
#a = test_db(r'l:\lilao\ht0707300800.dbf')
#print a
