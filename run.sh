#!/bin/bash

run(){
  local cmd="$@"
  casperjs $cmd # intentionally not quoted
}

upload_image_to_slack(){
  local filepath="$1"

  chmod +x ./upload-image-to-slack
  ./upload-image-to-slack < $filepath
}

upload_images_to_slack(){
  if [ ! -d "images" ]; then
    return
  fi
  if [ -z "$(ls "images")" ]; then
    return
  fi

  chmod -R 777 images
  for filepath in $(ls images); do
    upload_image_to_slack "images/${filepath}"
  done
}

main(){
  local cmd="$@"

  run "$cmd"
  echo "done, gonna upload the remains"
  upload_images_to_slack
}

main $@
