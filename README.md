# HumbleBee
HumbleBee - BeeTrail Field Logger app

## 1. Setup Instructions

### Clone the Repository  
```bash
git clone https://github.com/jeelpatel1812/HumbleBee.git
cd your-repo
```

### Run the following command in both client and server folders:

```bash
npm install
```
### Configure Environment Variables
```
Take ref from .env.sample
  PORT = 'port'
  CORS_ORIGIN = 'cors-origin'
  MONGO_URI = 'mongodb+srv://username:password@cluster0.qwertyu.mongodb.net'
  ACCESS_TOKEN_EXPIRY = 'acces-token-expiry'
  ACCESS_TOKEN_SECRET = 'acces-token-secret'
  REFRESH_TOKEN_EXPIRY = 'refresh-token-expiry'
  REFRESH_TOKEN_SECRET = 'refresh-token-secret'
```

### Start or run project from both client and server
```bash
cd server/src
node index.js
```

## 2. Sample data or Postman collection

```json
APIs
1. Post : api/hives/
   Body:
    {
    	"latitude": 53.72,
        "longitude": 337.3,
        "numColonies": 43
    }
   response :
    {
        "statusCode": 201,
        "data": {
            "location": {
                "type": "Point",
                "coordinates": [
                    53.72,
                    337.3
                ]
            },
            "_id": "683c3ce631f37597d9850cf0",
            "hiveId": "HIVE1748778214611",
            "datePlaced": "2025-06-01T00:00:00.000Z",
            "numColonies": 43,
            "createdAt": "2025-06-01T11:43:34.668Z",
            "updatedAt": "2025-06-01T11:43:34.668Z",
            "__v": 0
        },
        "message": "Hive log has been added succesfully.",
        "success": true
    }
2. Get  : api/hives/
  Quary Params: ?page=1&limit=8&startDate=2025-06-01&endDate=2025-06-03
  Response:
  {
    "statusCode": 201,
    "data": [
        {
            "_id": "683be88f4e2ff09dd877c8eb",
            "hiveId": "HIVE1748756623957",
            "datePlaced": "2025-06-02T05:43:43.957Z",
            "latitude": 12.33,
            "longitude": 23.23,
            "numColonies": 3,
            "createdAt": "2025-06-01T05:43:43.960Z",
            "updatedAt": "2025-06-01T05:43:43.960Z",
            "__v": 0
        }
    ],
    "message": "Hive log data has been fetched succesfully.",
    "success": true
  }
3. Post : api/crops/
   Body:
      {
        "name": "Sunflower-3",
        "floweringStart": "2025-05-03",
        "floweringEnd": "2025-06-23",
        "latitude": 3.2,
        "longitude": 2.33,
        "recommendedHiveDensity": 33
      }
   Response:
      {
        "statusCode": 201,
        "data": {
            "location": {
                "type": "Point",
                "coordinates": [
                    3.2,
                    2.33
                ]
            },
            "_id": "683c3dac31f37597d9850cf3",
            "name": "Sunflower-3",
            "floweringStart": "2025-05-03T00:00:00.000Z",
            "floweringEnd": "2025-06-23T00:00:00.000Z",
            "recommendedHiveDensity": 33,
            "__v": 0
        },
        "message": "New crop calendar entry has been added.",
        "success": true
      }
4. Get  : api/crops/
      Query Params: ?latitude=12.2&longitude=23.4&radiusInKm=5000&date=2025-05-20
      Response:
        {
            "statusCode": 201,
            "data": [
                {
                    "location": {
                        "type": "Point",
                        "coordinates": [
                            3.2,
                            2.33
                        ]
                    },
                    "_id": "683c333d55ff5e22cfb615a0",
                    "name": "Sunflower-4",
                    "floweringStart": "2025-04-03T00:00:00.000Z",
                    "floweringEnd": "2025-05-23T00:00:00.000Z",
                    "recommendedHiveDensity": 33,
                    "__v": 0
                }
            ],
            "message": "Crop log data has been fetched succesfully.",
            "success": true
        }
5. Post : api/user/login
6. Post : api/user/logout
7. Post : api/user/register

```

## 3. Explanation of logic

## 4. Mention of any bonus/assumptions

