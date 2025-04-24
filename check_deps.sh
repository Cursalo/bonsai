#!/bin/bash

# Check if npm and node are available
echo "Checking environment..."
which node || echo "Node.js not found!"
which npm || echo "npm not found!"

echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Check for critical dependencies
echo "Checking critical dependencies..."
npm ls next react react-dom @supabase/supabase-js || echo "Some dependencies are missing"

# Check for package.json
echo "Checking package.json..."
if [ -f package.json ]; then
  echo "package.json exists"
else
  echo "ERROR: package.json not found!"
  exit 1
fi

# Check for build output
echo "Checking build output..."
if [ -d .next ]; then
  echo ".next directory exists"
  if [ -f .next/BUILD_ID ]; then
    echo "BUILD_ID exists - build appears valid"
  else
    echo "WARNING: No BUILD_ID found in .next directory"
  fi
else
  echo "WARNING: .next directory does not exist yet (normal before build)"
fi

# Check for public directory
echo "Checking public directory..."
if [ -d public ]; then
  echo "public directory exists"
  if [ -f public/_redirects ]; then
    echo "_redirects file exists"
  else
    echo "WARNING: _redirects file missing"
  fi
  if [ -f public/_headers ]; then
    echo "_headers file exists"
  else
    echo "WARNING: _headers file missing"
  fi
else
  echo "WARNING: public directory not found"
fi

echo "Environment check complete." 