#!/bin/sh

HTTP_CODE=$(curl -sL -w "%{http_code}\\n" "http://127.0.0.1/" -o /dev/null)

if [ $HTTP_CODE -ne 200 ]; then
  echo "Returned HTTP code is $HTTP_CODE"
  exit 1
else
  exit 0
fi
