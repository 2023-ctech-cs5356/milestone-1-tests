#!/usr/bin/env bash
set -e

cd milestone-1-tests
npm install

command=$1
echo "Running command: $1"

if [ "$command" == 'lint' ]; then
  npx eslint --config=.eslintrc.json ../public/**.js
elif [ "$command" == "" ]; then
 echo "No command provided."
else
  echo "Unknown command: $1"
fi