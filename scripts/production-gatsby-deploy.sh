#!/usr/bin/env bash

# Preload base bash configuration and functions
source bgord-scripts/base.sh
setup_base_config

info "Environment: production"

GATSBY_ARCHIVE_PATH=$1

validate_non_empty $GATSBY_ARCHIVE_PATH "GATSBY_ARCHIVE_PATH"
check_if_file_exists $GATSBY_ARCHIVE_PATH

rsync -azP --delete public/ staging:/var/www/blog
scp $GATSBY_ARCHIVE_PATH staging:/etc/backups/blog
