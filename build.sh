#!/bin/bash

echo "Starting build process..."

# Update pip
echo "Updating pip..."
pip install --upgrade pip

# Install npm dependencies with clean cache
echo "Installing npm dependencies..."
npm cache clean --force
npm ci

# Run Next.js build
echo "Building Next.js application..."
npm run build

echo "Build process completed!" 