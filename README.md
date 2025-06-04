# Club IFTS 🏛️

**User-friendly system for club members. Registration and login**

With a user-centered design, ClubIFTS ensures an intuitive experience, enabling quick, secure procedures. The system integrates seamlessly into modern architectures and adapts to the organization's growth.

## 🚀 Features

- **User Registration**: Secure member registration system
- **Authentication**: Safe login and logout functionality
- **User Management**: Comprehensive member profile management
- **Responsive Design**: Optimized for all devices
- **Security**: Modern security practices implementation
- **Scalable Architecture**: Designed to grow with your organization

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: [Specify your backend technology]
- **Database**: [Specify your database]
- **Authentication**: [Specify authentication method]

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version X.X.X or higher)
- [Database system] (version X.X.X or higher)
- [Any other prerequisites]

## ⚡ Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/mauflorio/club-IFTS.git
cd club-IFTS
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory and add your configuration:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
PORT=3000
```

### 4. Database Setup

```bash
# Run database migrations
npm run migrate

# Seed the database (optional)
npm run seed
```

### 5. Start the application

```bash
# Development mode
npm run dev

# Production mode
npm start
```

The application will be available at `http://localhost:3000`

## 📚 Usage

### Registration

1. Navigate to the registration page
2. Fill in the required information
3. Submit the form
4. Check your email for verification (if applicable)

### Login

1. Go to the login page
2. Enter your credentials
3. Access your member dashboard

### Member Dashboard

- View and edit your profile
- Access club information
- [Add other dashboard features]

## 🏗️ Project Structure

```
club-IFTS/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   └── styles/
├── public/
├── docs/
├── tests/
├── package.json
└── README.md
```

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🚀 Deployment

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

### Docker (if applicable)

```bash
docker build -t club-ifts .
docker run -p 3000:3000 club-ifts
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow the existing code style
- Write clear commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Mauro Florio** - *Initial work/frontend* - [@mauflorio](https://github.com/mauflorio)
- **Iñaki Zarate** -  *frontend* - [@inakizarate25](https://github.com/inakizarate25)
- **Matias Parentti** - *Backend* -  [@mariasparentti](https://github.com/MatiasParentti)
- **Nicolas Mafone** - *Product owner* - 


## 🙏 Acknowledgments

- IFTS (Instituto de Formación Técnica Superior) for the educational framework
- All contributors who helped improve this project
- The open-source community for the amazing tools and libraries

## 📞 Support

If you have any questions or need help with the project:

- Create an [issue](https://github.com/mauflorio/club-IFTS/issues)
- Contact: [mau.florio@gmail.com]

## 🔄 Changelog

### [1.0.0] - 2025-06-01
- Initial release
- User registration system
- Login functionality
- Basic member dashboard

---

**Made with ❤️ for the IFTS community**
