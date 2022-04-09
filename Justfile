#!/usr/bin/env just --justfile

_default:
  just --list

# load .env file
set dotenv-load


# Build the whole project
build:
  bin/build.sh
alias b := build

# Format the code
fmt:
  treefmt
alias f := fmt

# Run the server
server:
  npm run server
alias s := server  
