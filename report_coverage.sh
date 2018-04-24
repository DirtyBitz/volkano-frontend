#! /bin/bash

frontend=$(grep -B 1 Lines < frontend/coverage/index.html | grep -oP '(\d+(\.\d+)?)%' | cut -d% -f1)
backend=$(grep -oP '(\d+(\.\d+)?)%\</span\>' < backend/coverage/index.html | head -n 1 | cut -d% -f1)
echo "$frontend% - lines of code tested in frontend"
echo "$backend% - lines of code tested in backend"
ruby -e "puts \"#{(($backend + $frontend) / 2).round(2)}% - total lines of code tested\""
