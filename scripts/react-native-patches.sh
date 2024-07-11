#!/bin/sh
# Fix broken bits of latest react, metro
echo "[react-native-patches] copying patches to node_modules..."
set -x
cd patches || exit
cp metro/src/node-haste/DependencyGraph.js ../node_modules/metro/src/node-haste/
cp react-dom/cjs/react-dom.development.js ../node_modules/react-dom/cjs/
cp react-native/Libraries/Renderer/implementations/React* ../node_modules/react-native/Libraries/Renderer/implementations
set +x
echo "[react-native-patches] COMPLETE."
