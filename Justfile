# just is a handy way to save and run project-specific commands.
#
# https://github.com/casey/just

# list all tasks
default:
  just --list

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