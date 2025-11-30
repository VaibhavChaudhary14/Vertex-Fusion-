#!/bin/bash
set -e

echo "Installing dependencies..."
npm install

echo "Building with tsx..."
npx tsx script/build.ts

echo "Build complete!"
