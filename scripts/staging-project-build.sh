#!/usr/bin/env bash

# Preload base bash configuration and functions
source bgord-scripts/base.sh
setup_base_config

info "Environment: production"

GATSBY_ARCHIVE_PATH="build-cache/public.tar.gz"

info "Cleaning previous build cache..."
rm -rf build-cache/
mkdir -p build-cache
npx gatsby clean

npx gatsby build

info "Creating app archive..."
tar czf $GATSBY_ARCHIVE_PATH public/

success "App archive created at $GATSBY_ARCHIVE_PATH"

info "You can test the app on your local machine by running: gatsby serve"
