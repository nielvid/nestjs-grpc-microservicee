#!/bin/sh
protoc --plugin=protoc-gen-ts_proto=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=nestJs=true,importSuffix=.js:.  ./src/proto/*.proto

# with metadata
protoc --plugin=protoc-gen-ts_proto=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=nestJs=true,importSuffix=.js:.  --ts_proto_opt=addGrpcMetadata=true  ./src/proto/*.proto

# with rest objects
protoc --plugin=protoc-gen-ts_proto=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=nestJs=true,importSuffix=.js:.  --ts_proto_opt=addGrpcMetadata=true  --ts_proto_opt=addNestjsRestParameter=true ./src/proto/*.proto