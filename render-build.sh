#!/bin/bash
set -e

echo "Installing all dependencies including devDependencies..."
npm install --production=false

echo "Building with tsx..."
npx tsx script/build.ts

echo "Build complete!"
