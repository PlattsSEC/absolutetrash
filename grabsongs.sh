#!/usr/bin/env bash

youtube-dl \
	-x \
	--audio-format mp3 \
	-o "music/%(title)s-%(id)s.%(ext)s" \
	$(cat urls.txt)
