#!/bin/bash

docker build --tag r-server --file ./server.Dockerfile .
# docker run -it --rm -p 4001:4000 r-server
