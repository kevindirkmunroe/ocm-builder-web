#!/usr/bin/env bash

rm -rf "${HOME}/Library/Caches/CocoaPods"
rm -rf "`pwd`/Pods/"
RCT_NEW_ARCH_ENABLED=0 pod install
