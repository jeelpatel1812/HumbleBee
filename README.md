# HumbleBee
HumbleBee - BeeTrail Field Logger app

## 🚀 Setup Instructions

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
