#!/bin/sh

ab -n10000 -c50 http://127.0.0.1:3000/hyperapp
ab -n10000 -c50 http://127.0.0.1:3000/inferno
ab -n10000 -c50 http://127.0.0.1:3000/preact
ab -n10000 -c50 http://127.0.0.1:3000/rax
ab -n10000 -c50 http://127.0.0.1:3000/react
ab -n10000 -c50 http://127.0.0.1:3000/vhtml
