#!/bin/sh

ab -k -n10000 -c50 http://127.0.0.1:3000/hyperapp
ab -k -n10000 -c50 http://127.0.0.1:3000/inferno
ab -k -n10000 -c50 http://127.0.0.1:3000/nerv
ab -k -n10000 -c50 http://127.0.0.1:3000/preact
ab -k -n10000 -c50 http://127.0.0.1:3000/rax
ab -k -n10000 -c50 http://127.0.0.1:3000/react
ab -k -n10000 -c50 http://127.0.0.1:3000/vhtml
