# 🚀 Deployment Guide - Render + Vercel

## 📋 Prerequisites
- GitHub account
- Render account
- Vercel account
- MongoDB Atlas database

## 🔧 Backend Deployment (Render)

### 1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. **Create New Web Service on Render**
- Go to [render.com](https://render.com) and sign in
- Click "New +" → "Web Service"
- Connect your GitHub repository

### 3. **Configure Render Settings**
```
Name: ecommerce-backend
Environment: Node
Region: Choose closest to your users
Branch: main
Root Directory: server
Build Command: npm install
Start Command: npm start
```

### 4. **Add Environment Variables in Render**
```
PORT=10000
MONGO_URI=mongodb+srv://barathpdev_db_user:rn7GEwIeO5ibXDcE@cluster0.hjxedmj.mongodb.net/?appName=Cluster0
NODE_ENV=production
```

### 5. **Deploy & Get Backend URL**
- Click "Create Web Service"
- Wait for deployment (5-10 minutes)
- Copy your backend URL: `https://your-app-name.onrender.com`

## 🌐 Frontend Deployment (Vercel)

### 1. **Update CORS Settings**
In your Render backend, go to Environment and add:
```
FRONTEND_URL=https://your-vercel-app.vercel.app
```

Then update `server/server.js` CORS origin array with your Vercel URL.

### 2. **Deploy to Vercel**
```bash
cd client
npm install -g vercel
vercel login
vercel --prod
```

**Or use Vercel Dashboard:**
- Go to [vercel.com](https://vercel.com)
- Import Git Repository
- Framework: Create React App
- Root Directory: `client`
- Build Command: `npm run build`
- Output Directory: `build`

### 3. **Configure Vercel Settings**
```
Build Command: npm run build
Output Directory: build
Install Command: npm install
Development Command: npm start
```

### 4. **Add Environment Variables in Vercel Dashboard**
```
REACT_APP_API_URL=https://your-render-app-name.onrender.com
```

## 🔄 Post-Deployment Steps

### 1. **Update CORS in Backend**
Update the CORS origins in `server/server.js`:
```javascript
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-vercel-app.vercel.app']
    : ['http://localhost:3000'],
  credentials: true
};
```

### 2. **Test Your Deployed App**
- Frontend URL: `https://your-vercel-app.vercel.app`
- Backend URL: `https://your-render-app.onrender.com`

### 3. **Verify API Endpoints**
```bash
curl https://your-render-app.onrender.com/api/products
```

## 🛠 Quick Deployment Commands

### **For Backend (Render)**
```bash
# Render will automatically:
# 1. Run: npm install
# 2. Run: npm start
```

### **For Frontend (Vercel)**
```bash
# Vercel will automatically:
# 1. Run: npm install
# 2. Run: npm run build
# 3. Deploy build folder
```

## 🔧 Environment Variables Summary

### **Render (Backend)**
```
PORT=10000
MONGO_URI=mongodb+srv://barathpdev_db_user:rn7GEwIeO5ibXDcE@cluster0.hjxedmj.mongodb.net/?appName=Cluster0
NODE_ENV=production
```

### **Vercel (Frontend)**
```
REACT_APP_API_URL=https://your-render-app-name.onrender.com
```

## 🚨 Important Notes

1. **Free Tier Limitations:**
   - Render: Sleeps after 15 minutes of inactivity
   - Vercel: 100GB bandwidth/month limit

2. **First Request Delay:**
   - Render free tier has cold start (~30 seconds)

3. **Custom Domains:**
   - Add your custom domain in Vercel dashboard
   - Update CORS origins accordingly

4. **Security:**
   - Never commit `.env` files
   - Use environment variables for all secrets
   - Enable HTTPS only in production

## 🎯 Troubleshooting

### **Common Issues:**
1. **CORS Errors:** Update origins in server CORS config
2. **API Not Found:** Check REACT_APP_API_URL environment variable
3. **Database Connection:** Verify MongoDB URI and IP whitelist
4. **Build Failures:** Check package.json scripts and dependencies

### **Logs & Debugging:**
- **Render:** View logs in Render dashboard
- **Vercel:** Use `vercel logs` command or dashboard
- **MongoDB:** Check Atlas logs for connection issues