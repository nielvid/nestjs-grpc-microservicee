

## Description

GRPC microservice server and client

## Commands

```bash
$ protoc --plugin=protoc-gen-ts_proto=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=nestJs=true,importSuffix=.js:.  --ts_proto_opt=addGrpcMetadata=true  --ts_proto_opt=addNestjsRestParameter=true ./src/proto/*.proto
```
 - run above command to generate ts- files from .proto file

