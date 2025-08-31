# 🏗️ CivilDoc AI - AI-Powered Documentation Assistant

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yuxuan980925/civildoc-ai1)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yuxuan980925/civildoc-ai1)

> AI-powered documentation assistant specifically designed for civil engineers and construction professionals.

## 🌟 Features

### 📄 Smart Document Management
- Create, edit, and manage engineering documents
- AI-powered writing assistance and suggestions
- Document version control and collaboration
- Professional engineering templates

### 🤖 AI Agent Tasks
- **Environmental Impact Report Generation**: Automated environmental assessments
- **Building Plan Data Extraction**: AI-powered technical drawing analysis
- **Compliance Checking**: Automated verification against building regulations
- Real-time task progress visualization

### 📊 Analytics Dashboard
- Project statistics and trend analysis
- Interactive charts powered by Plotly
- Performance metrics monitoring
- Work efficiency analysis

### 📁 File Processing
- Multi-format support (PDF, Excel, Images, etc.)
- Intelligent file analysis and content extraction
- Batch processing capabilities
- OCR text recognition

## 🚀 Quick Start

### Option 1: Static HTML Demo
```bash
# Open directly in browser
open public/index.html
# or
start demo.html
```

### Option 2: Streamlit Interactive App
```bash
# Install dependencies
pip install -r requirements.txt

# Run the app
streamlit run streamlit_app.py
```

### Option 3: Next.js Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## 🌐 Live Demo

- **Static Demo**: [View Demo](https://your-deployment-url.vercel.app/demo)
- **Interactive App**: [Streamlit App](https://your-streamlit-app.streamlit.app)

## 🛠️ Tech Stack

### Frontend
- **Next.js** - React framework for production
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript

### Interactive App
- **Streamlit** - Python web app framework
- **Plotly** - Interactive data visualization
- **Pandas** - Data manipulation and analysis

### Deployment
- **Vercel** - Frontend deployment
- **Netlify** - Static site hosting
- **Streamlit Cloud** - Interactive app hosting

## 📁 Project Structure

```
civildoc-ai/
├── public/                 # Static assets
│   ├── index.html         # Landing page
│   ├── demo.html          # Static demo
│   ├── deploy.html        # Deployment guide
│   └── mock-data.json     # Sample data
├── pages/                 # Next.js pages
│   ├── api/              # API routes
│   ├── document/         # Document pages
│   └── task/             # Task pages
├── streamlit_app.py      # Streamlit main app
├── demo.html             # Standalone demo
├── requirements.txt      # Python dependencies
├── package.json          # Node.js dependencies
└── README.md            # This file
```

## 🎯 Core Features Demo

### Document Management
- ✅ Create and edit engineering documents
- ✅ AI writing assistant with real-time suggestions
- ✅ Document status tracking (Draft/Review/Complete)
- ✅ Professional document templates

### AI Task Automation
- ✅ Environmental impact report generation
- ✅ Technical drawing data extraction
- ✅ Building code compliance checking
- ✅ Real-time progress tracking

### Data Visualization
- ✅ Interactive project analytics
- ✅ Performance metrics dashboard
- ✅ Trend analysis and reporting
- ✅ Export capabilities

## 🚀 Deployment Options

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Netlify
1. Push code to GitHub
2. Connect repository to Netlify
3. Configure build settings

### Streamlit Cloud
1. Push code to GitHub
2. Connect to Streamlit Cloud
3. Deploy `streamlit_app.py`

## 🔧 Configuration

### Environment Variables
```env
# Optional - for production features
OPENAI_API_KEY=your-api-key
DATABASE_URL=your-database-url
```

### Vercel Configuration
See `vercel.json` for deployment settings.

### Netlify Configuration
See `netlify.toml` for build and deployment settings.

## 🧪 Testing

### Local Testing
```bash
# Test static version
start demo.html

# Test Streamlit version
streamlit run streamlit_app.py

# Test Next.js version
npm run dev
```

### Features to Test
- [ ] Document creation and editing
- [ ] AI task execution
- [ ] File upload and processing
- [ ] Data visualization
- [ ] Responsive design
- [ ] Cross-browser compatibility

## 📱 Responsive Design

The application is fully responsive and works on:
- ✅ Desktop (1920x1080+)
- ✅ Laptop (1366x768+)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x667+)

## 🎨 Design System

### Colors
- **Primary**: Blue (#2563eb)
- **Secondary**: Gray (#6b7280)
- **Success**: Green (#10b981)
- **Warning**: Amber (#f59e0b)
- **Error**: Red (#ef4444)

### Typography
- **Font**: Inter (system fallback)
- **Headings**: Bold, varied sizes
- **Body**: Regular, 16px base

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Repository**: [GitHub](https://github.com/yuxuan980925/civildoc-ai1)
- **Documentation**: [Wiki](https://github.com/yuxuan980925/civildoc-ai1/wiki)
- **Issues**: [Bug Reports](https://github.com/yuxuan980925/civildoc-ai1/issues)
- **Discussions**: [Community](https://github.com/yuxuan980925/civildoc-ai1/discussions)

## 🌟 Acknowledgments

- Built with [Streamlit](https://streamlit.io/)
- UI components from [Tailwind CSS](https://tailwindcss.com/)
- Charts powered by [Plotly](https://plotly.com/)
- Icons from [Heroicons](https://heroicons.com/)

---

**Made with ❤️ for Civil Engineers**

*CivilDoc AI - Transforming engineering documentation with artificial intelligence*
