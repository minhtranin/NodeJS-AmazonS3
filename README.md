# NodeJS-AmazonS3
easible interact with api aws
1. Set up env
2. extend class AmazonS3
## Setup
add variable environment in dot env file.
```bash
ACCESSKEY_ID_AWS = your accesskey aws account
SECRETKEY_AWS = your SECRETKEY AWS aws account
BUCKETNAME = bucket name
ENDPOINT = endpoint position put s3 service (not required)
```
## Use
### 1.Upload.
``` bash
/**
         * function to upload  ,will be throw error if exist
         * @param {object} file this is a object contain file type binary, buffer, path directory
         * @returns {object} information object have transmitted 
         * @throws
         */
         
  const amazon = new AmazonS3();
        try {
          const fileAmz = await amazon.upload(file);
          data.file = fileAmz.Location

        } catch (err) {
          return response.respondWithError(err)
        }
```
### 2.Delete
### 3.Update
### 4.Download
### 5.GetList
### 6.AddPolicy
### 7.AddBucket
### 8.DeleteBucket
### 9.GetLink
