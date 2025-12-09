#!/bin/bash

echo "🚀 Starting FuturaWatch Development Server..."
echo "📁 Current directory: $(pwd)"
echo "⏰ $(date)"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Kill any existing dev servers on common ports
echo "🔄 Checking for existing servers..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
lsof -ti:3001 | xargs kill -9 2>/dev/null || true

echo "🌟 Starting Next.js development server..."
npm run dev
