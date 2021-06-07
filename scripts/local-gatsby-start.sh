#!/usr/bin/env bash

# Preload base bash configuration and functions
source scripts/base.sh
setup_base_config

info "Environment: local"

npx gatsby develop
