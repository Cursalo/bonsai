#!/bin/bash

echo "Starting build process..."

# Update pip
echo "Updating pip..."
pip install --upgrade pip

# Install npm dependencies with clean cache
echo "Installing npm dependencies..."
npm cache clean --force
npm ci

# Clean any previous build artifacts
echo "Cleaning previous build artifacts..."
rm -rf .next

# Run Next.js build
echo "Building Next.js application..."
npm run build

# List build output to verify
echo "Verifying build output..."
ls -la .next

echo "Build process completed!" 