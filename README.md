# Marquee - Concert Discovery Social Platform

A full-stack web application for discovering concerts, managing personal lists, and connecting with music groups.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Concert Management**: Add and track concerts you're interested in
- **Group Discovery**: Find and join music groups
- **Search Functionality**: Search for concerts and events
- **User Profiles**: Manage your personal concert lists and group memberships

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Passport.js** - Authentication middleware
- **JWT** - Token-based authentication

### Frontend
- **AngularJS** - Frontend framework
- **Angular Material** - UI components
- **UI-Router** - Client-side routing

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/awandres/marquee.git
   cd marquee
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=8080
   TOKEN=your_jwt_secret_here
   MLAB_URL=your_production_mongodb_url
   ```

4. **Start MongoDB**
   ```bash
   # Using Homebrew on macOS
   brew services start mongodb/brew/mongodb-community@6.0
   
   # Or using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:6.0
   ```

5. **Start the application**
   ```bash
   npm start
   ```

6. **Access the app**
   Open your browser and navigate to `http://localhost:8080`

## 📁 Project Structure

```
marquee/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── README.md             # This file
├── apiControllers/       # API route controllers
│   ├── authentication.js
│   └── profile.js
├── config/               # Configuration files
│   └── passport.js       # Passport authentication config
├── db/                   # Database files
│   ├── connection.js     # MongoDB connection
│   ├── schema.js         # Mongoose schemas
│   ├── seed.js          # Database seeding
│   └── *.json           # Seed data files
├── public/               # Frontend files
│   ├── index.html       # Main HTML file
│   ├── css/             # Stylesheets
│   └── js/              # AngularJS application
│       ├── app.js       # Main app configuration
│       ├── controllers/ # Angular controllers
│       ├── services/    # Angular services
│       └── views/       # HTML templates
├── utils/                # Utility files
│   └── logger.js        # Custom logging utility
└── logs/                # Application logs (created at runtime)
    ├── app.log
    ├── error.log
    └── debug.log
```

## 🔧 API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - User login
- `GET /api/profile` - Get user profile (authenticated)

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:username` - Get specific user
- `PUT /api/users/:username` - Update user concerts
- `PUT /api/users/:username/groups` - Update user groups

### Groups
- `GET /api/groups` - Get all groups
- `PUT /api/groups/:groupname` - Update group concerts

## 🚀 Recent Improvements

### Code Quality Enhancements
- ✅ **Fixed deprecated Mongoose syntax** - Updated connection logic with proper error handling
- ✅ **Enhanced error handling** - Added comprehensive try-catch blocks and proper HTTP status codes
- ✅ **Input validation** - Added sanitization middleware and schema validation
- ✅ **Structured logging** - Custom logger with file output and different log levels
- ✅ **Database improvements** - Better schema validation and error handling
- ✅ **Graceful shutdown** - Proper cleanup on process termination

### Error Handling
- Consistent API response format with `success` flags
- Proper HTTP status codes (400, 404, 500)
- Detailed error logging with stack traces
- Global error handler middleware

### Security
- Input sanitization for all requests
- Password hashing with crypto
- JWT token authentication
- Environment variable protection

### Logging
- Structured JSON logging
- Multiple log levels (INFO, ERROR, WARN, DEBUG, SUCCESS)
- File-based logging with rotation
- Process monitoring and error tracking

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment (development/production) | No |
| `PORT` | Server port | No (defaults to 8080) |
| `TOKEN` | JWT secret key | Yes |
| `MLAB_URL` | Production MongoDB URL | No (development uses local) |

## 🐛 Debugging

View application logs:
```bash
# View all logs
tail -f logs/app.log

# View only errors
tail -f logs/error.log

# View debug information (development only)
tail -f logs/debug.log
```

## 🚀 Deployment

The application is configured for Heroku deployment with the included `Procfile`.

1. Set environment variables in production
2. Ensure MongoDB instance is accessible
3. Deploy using your preferred method

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.