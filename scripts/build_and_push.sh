#!/bin/bash

set -e

registry=docker-hosted.weblite.me
repo=mahdi/cv
tag=$1
if [ -z "$tag" ]; then
  tag=$(date +"$(date +'%Y')"$(TZ=Asia/Tehran date +'%m%dT%H%M'))
fi

image=$registry/$repo:$tag

docker build . -f Dockerfile -t $image
docker push $image

echo "Image built and pushed:"
echo "Image: $image"
echo "Registry: $registry"
echo "Repo: $repo"
echo "Tag: $tag"
