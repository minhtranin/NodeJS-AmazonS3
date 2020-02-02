'use strict'
const path = require('path')
const AWS = require('aws-sdk')
const Env = use('Env')

/**
 * @description
 * documentation AmazonS3 package use Aws-S3 through aws-sdk npm package
 * full documentation https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
 * @version 1.00
 * @author  tcm 💘
 * @since  30-11-2019
 */

module.exports = class AmazonS3 {
    /**
         * @constructor
         * @param {object} option
         * @alias AmazonS3
         */

    constructor() {
        this.accessKeyId = Env.get('ACCESSKEY_ID_AWS')
        this.secretAccessKey = Env.get('SECRETKEY_AWS')
        this.bucket = Env.get('BUCKETNAME')
        this.region = AWS.config.region
        this.version = '2006-03-01'
        this.s3 = new AWS.S3({
            //endpoint: new AWS.Endpoint(Env.get('ENDPOINT')),
            accessKeyId: this.accessKeyId,
            secretAccessKey: this.secretAccessKey,
            apiVersion: this.version
        })
    }



    /**
         * function to upload  ,will be throw error if exist
         * @param {object} file this is a object contain file type binary, buffer, path directory
         * @returns {object} information object have transmitted
         * @throws
         */

    async upload(file) {
        const params = {
            Bucket: this.bucket,
            Key: `${file.root}/${file.clientName}`, //Course_videos
            Body: file.stream,     // read byte from stream input (can use fs.readFileStream)
            ContentType: (file.ContentType) ? file.ContentType : "",//file.contentType,
            ACL: 'public-read',//public-read-write
        }
        if (!file.ContentType) delete params.ContentType //  auto dowload when access link
        const options = {
            partSize: 10 * 1024 * 1024,
            queueSize: 10
        }
        return  await this.s3.upload(params, options).promise()


    }



    /**
         * function to delete object all version, will be throw error if exist
         * @param {string} filePath  location of file
         * @example path <=> key : {folder}/{nameFile}
         * @throws
         */

    async delete(path) {
        let Key = path.split('/')
            Key = `${Key[Key.length-2]}/${Key[Key.length-1]}`
        const params = {
            Bucket: this.bucket,
            Key
        }
        await this.s3.deleteObject(params).promise()
    }



    /**
         * function to list all files in a Bucket, will be throw error if exist
         * @param {object} [ params= { Bucket : bucketName } ] have contain object param default
         * @returns {object} get all object in bucket
         * @throws
         */

    async list(params = { Bucket: this.bucket }) {
        return  await this.s3.listObjectsV2(params).promise()

    }




    /**
         * function to create new bucket, will be throw error if exist
         * @param {string} bucket this is a bucket name
         * @throws
         */

    async createBucket(Bucket) {
        return  await this.s3.createBucket({ Bucket }).promise()

        }



    /**
         * function to delete bucket, will be throw error if exist
         * @param {string} bucket this is a bucket name
         * @throws
         */

    async deleteBucket(Bucket){
        await this.s3.deleteBucket({Bucket}).promise()
    }


    /**
         * function to dowload file, will be throw error if exist
         * @param {string} filePath  key file
         * @returns {Buffer} return.Body
         * @throws
         * @example
         *
         *      const amazon = new AmazonS3()
         *      const data = await amazon.dowload('Course_videos/NODEJS_BACKGROUND.jpeg')
         *      response.header('Content-disposition', 'attachment; filename=theDocument.jpg')
         *      return response.send(data.Body)
         */
    async dowload(Key){
        const params = {
            Bucket:this.bucket ,Key
        }
        return await this.s3.getObject(params).promise()
    }



    /**
         * function to help get link file
         * @param {string} key this is a bucket name,
         * @deprecated
         * @returns {string} url
         */

         getUrl(Key){
        const params = {
            Bucket:this.bucket, Key
        }
        return  this.s3.getSignedUrl('getObject',params)


    }


    /**
         * @example
         *
         *  const str = new AmazonS3
         * try
         *      await str.delete('Course_video/vd5.mp4')
         *  response.status(200).send('delete file sucessful')
         * catch (err){
         *  response.status(404).send(err)
         * }
         *
         */


        /**
         * @description
         * this is a func to get link bucket in cloudfront have distributed
         * use through aws-cloudfront-sign npm package
         * @deprecated
         * @author  tcm 💘
         */

        static getLinkCloud(filename) {
            return new Promise(function (resolve, reject) {
              var options = {
                                keypairId: process.env.CLOUDFRONT_ACCESS_KEY_ID,
                                privateKeyPath: process.env.CLOUDFRONT_PRIVATE_KEY_PATH
                            };
              var signedUrl = awsCloudFront.getSignedUrl(process.env.CLOUDFRONT_URL + filename, options);
              resolve(signedUrl);
            });
          }
}

