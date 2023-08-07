#!/usr/bin/env bash

# Preload base bash configuration and functions
source bgord-scripts/base.sh

OUT_DIR="build"

info "Environment: staging"
export NODE_ENV="staging"

check_if_directory_exists node_modules

# ==========================================================

info "Building project!"

# ==========================================================

rm -rf $OUT_DIR
mkdir $OUT_DIR
npx gatsby clean
info "Cleaned previous build cache"

# ==========================================================

npx gatsby build
cp -r public/ build
info "Gatsby built"

# ==========================================================

npx gzip build/*.js --extension=gz --extension=br
npx gzip build/*.css --extension=gz --extension=br
npx gzip build/*.png --extension=gz --extension=br
npx gzip build/*.html --extension=gz --extension=br
info "Compressing static files"

# ==========================================================

success "Project built correctly!"
