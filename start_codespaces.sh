#!/bin/bash

echo "🏗️  Starting CivilDoc AI Demo in GitHub Codespaces"
echo "=================================================="

# Check Python version
echo "📋 Checking Python version..."
python --version

# Install Python dependencies
echo "📦 Installing Python dependencies..."
pip install -r requirements.txt

# Check Node.js version
echo "📋 Checking Node.js version..."
node --version
npm --version

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
npm install

echo ""
echo "🎯 Available Demo Options:"
echo "=========================="
echo ""
echo "1. 🌐 Static HTML Demo:"
echo "   Open: public/index.html in browser"
echo "   Or run: python -m http.server 8000"
echo "   Then visit: http://localhost:8000"
echo ""
echo "2. 🚀 Streamlit Interactive App:"
echo "   Run: streamlit run streamlit_app.py"
echo "   Then visit: http://localhost:8501"
echo ""
echo "3. ⚡ Next.js Development:"
echo "   Run: npm run dev"
echo "   Then visit: http://localhost:3000"
echo ""
echo "✅ Setup complete! Choose your preferred demo option above."
