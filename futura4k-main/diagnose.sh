#!/bin/bash

echo "🔍 FuturaWatch Diagnostic Report"
echo "================================="
echo "⏰ Generated: $(date)"
echo ""

# Check Node.js and npm versions
echo "📋 System Information:"
echo "Node.js version: $(node --version 2>/dev/null || echo 'Node.js not found')"
echo "npm version: $(npm --version 2>/dev/null || echo 'npm not found')"
echo "Current directory: $(pwd)"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ ERROR: package.json not found. Make sure you're in the project directory."
    echo "   Expected location: /Users/huso/Desktop/futura4k-2"
    exit 1
fi

echo "✅ Found package.json"
echo ""

# Check package.json scripts
echo "📄 Available npm scripts:"
cat package.json | grep -A 10 '"scripts"' | head -15
echo ""

# Check if node_modules exists
if [ -d "node_modules" ]; then
    echo "✅ node_modules directory exists"
else
    echo "❌ node_modules directory missing"
    echo "   Run: npm install"
fi
echo ""

# Check for TypeScript compilation errors
echo "🔍 Checking for TypeScript errors..."
if npx tsc --noEmit --skipLibCheck 2>/dev/null; then
    echo "✅ No TypeScript compilation errors"
else
    echo "❌ TypeScript compilation errors found"
    echo "   Running TypeScript check..."
    npx tsc --noEmit --skipLibCheck
fi
echo ""

# Check translation files
echo "🌍 Checking translation files:"
for lang in en es de fr it; do
    if [ -f "translations/${lang}.ts" ]; then
        echo "✅ translations/${lang}.ts exists"
    else
        echo "❌ translations/${lang}.ts missing"
    fi
done
echo ""

# Check for running processes
echo "🔍 Checking for running Node.js processes:"
ps aux | grep -E "(node|next)" | grep -v grep || echo "No Node.js processes running"
echo ""

# Check ports
echo "🔍 Checking common ports:"
for port in 3000 3001 3006; do
    if lsof -ti:$port >/dev/null 2>&1; then
        echo "⚠️  Port $port is in use"
        echo "   Process: $(lsof -ti:$port | xargs ps -p | tail -1)"
    else
        echo "✅ Port $port is available"
    fi
done
echo ""

echo "🚀 To start the development server:"
echo "   1. Run: chmod +x start-dev.sh"
echo "   2. Run: ./start-dev.sh"
echo "   3. Or run: npm run dev"
echo ""

echo "🌐 Once server starts, try these URLs:"
echo "   • http://localhost:3000"
echo "   • http://localhost:3000/reseller"
echo "   • http://localhost:3000/subscriptions"
echo ""

echo "🔧 If you see a white screen:"
echo "   1. Open browser DevTools (F12)"
echo "   2. Check Console tab for errors"
echo "   3. Check Network tab for failed requests"
echo "   4. Try hard refresh (Cmd+Shift+R)"
echo "   5. Try incognito/private window"
