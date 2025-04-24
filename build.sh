#!/bin/bash

echo "Starting build process..."

# Skip pip update - no longer needed
# echo "Updating pip..."
# pip install --upgrade pip

# Display environment info
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Install npm dependencies with clean cache and legacy peer deps
echo "Installing npm dependencies..."
npm cache clean --force
npm ci --legacy-peer-deps

# Clean any previous build artifacts
echo "Cleaning previous build artifacts..."
rm -rf .next

# Run Next.js build
echo "Building Next.js application..."
NODE_OPTIONS="--max_old_space_size=4096" npm run build

# List build output to verify
echo "Verifying build output..."
ls -la .next

# Debug the publish directory setting
echo "Debug: Checking publish directory setting"
echo "NETLIFY_PUBLISH_DIR=.next"

echo "Build process completed!" 