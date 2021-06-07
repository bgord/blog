#!/usr/bin/env bash

# Usage:

# ```
# ./scripts/local-gatsby-start
# ./scripts/local-gatsby-start -f
# ./scripts/local-gatsby-start --force
# ```

# Options:
# -f --force - clears Gatsby cache

# Preload base bash configuration and functions
source scripts/base.sh
setup_base_config

info "Environment: local"

SHOULD_CLEAR_GATSBY_CACHE=0

while test "$#" -gt 0; do
    case $1 in
        -f|--force) SHOULD_CLEAR_GATSBY_CACHE=1;;
        *) echo "Unknown parameter passed: $1"; exit 1;;
    esac
    shift
done

if test $SHOULD_CLEAR_GATSBY_CACHE == 1;
then
  info "Clearing Gatsby cache..."
  gatsby clean
fi

npx gatsby develop
