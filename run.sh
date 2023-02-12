#!/usr/bin/env bash
set -e
trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT

cd milestone-1-tests
npm install

command=$1
echo "Running command: $1"

if [ "$command" == 'lint' ]; then
  npx eslint --config=.eslintrc.json ../public/**.js
elif [ "$command" == 'browser' ]; then
  target_dir=$PWD/../public/
  echo "TARGET_DIRECTORY is $target_dir"
  python3 -m http.server 9000 --directory $target_dir &
  npx jest --config=jest.config.js
elif [ "$command" == "" ]; then
 echo "No command provided."
else
  echo "Unknown command: $1"
fi