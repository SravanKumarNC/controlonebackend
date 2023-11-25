# import os
# os.system('pip install pymongo')
# exit_code = 1
# while exit_code != 0:
#     exit_code = os.system('exit $?')
import time
import random
import pymongo


mongodb_uri = "mongodb+srv://sudusudevku:Ernesto60@controlonecluster.amfafgu.mongodb.net/ControlOneDB?retryWrites=true&w=majority"
database_name = "ControlOneDB"  # database name
collection_name = "equipments"  # collection name
client = pymongo.MongoClient(mongodb_uri)
if client != '':
    print('Connected to mongoDB')
db = client[database_name]
collection = db[collection_name]
def update_data(arg1,*args):
    forklift_id = arg1
    results = collection.find({"equipment_id": forklift_id})
    print("BEFORE UPDATION : ")
    for result in results:
        print(result)
    property = []
    values =[]
    for i in range(0,len(args),2):
        property.append(args[i])
    for i in range(1,len(args),2):
        values.append(args[i])
    for i in range(0,len(property)):
        collection.update_one({"id": forklift_id}, {"$set": {property[i]: values[i]}})
    results = collection.find({"id": forklift_id})
    print("AFTER UPDATION : ")
    for result in results:
        print(result)
for i in range(20):
    if(i<10):
        update_data('3','status','Active')
        update_data('3', 'pedalValue', i)
        update_data('3',"downLidar",i)
        update_data('3','steeringStatus',i)
        update_data('3','pedalValue',i)
    else:
        update_data('3','status','Deactive')
        update_data('3', 'pedalValue', i)
        update_data('3',"downLidar",i)
        update_data('3','steeringStatus',i)
        update_data('3','pedalValue',i)
