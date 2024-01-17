import boto3


class StorageProvider:
    metadata = {"ContentDisposition": "inline", "CacheControl": "max-age=86400"}

    def __init__(self, bucket_name="youtubeq", token: str = None):
        self.bucket_name = bucket_name
        self.client = boto3.client("s3")
        self.chunk_size = 1024 * 1024 * 5
        self.token = token

    def get_file_size(self, object_key):
        try:
            response = self.client.head_object(Bucket=self.bucket_name, Key=object_key)
            return response["ContentLength"]
        except Exception as e:
            print(f"Error {e}")
            return None
    
    
    def not_over_limit(self):
        response  = self.client.list_objects_v2(Bucket=self.bucket_name)
        total_size = 0
        for obj in response.get('Contents', []):
            total_size += obj['Size']
        usage = round(total_size / (1024**3))

        return usage < 10

    def _upload_chunk(self, chunk, object_name, upload_id, part_number):
        try:
            part = self.client.upload_part(
                Bucket=self.bucket_name,
                Key=object_name,
                PartNumber=part_number,
                UploadId=upload_id,
                Body=chunk,
            )
            return {"PartNumber": part_number, "ETag": part["ETag"]}
        except Exception as e:
            print(f"Error in uploading chunk {part_number}: {e}")
            return None

    def upload_file_in_chunks(
        self, chunk, file_name, upload_id=None, part_number=1, content_type=""
    ):
  
        file_path = self.token + "/" + file_name
        self.metadata["ContentType"] = content_type
        extra_args = {}
        
        if self.metadata:
            extra_args = self.metadata
        if not upload_id:
            multipart_upload = self.client.create_multipart_upload(
                Bucket=self.bucket_name, Key=file_path, **extra_args
            )
            upload_id = multipart_upload["UploadId"]
        part = self._upload_chunk(chunk, file_path, upload_id, part_number)
        self.upload_id = upload_id
        return part

    def complete_upload(self, object_name, upload_id, parts):
        file_path = self.token + "/" + object_name
        self.client.complete_multipart_upload(
            Bucket=self.bucket_name,
            Key=file_path,
            UploadId=upload_id,
            MultipartUpload={"Parts": parts},
        )

    def list_files(self):
        files_response = {"files": []}
        folder_prefix = self.token + "/"
        response = self.client.list_objects_v2(
            Bucket=self.bucket_name, Prefix=folder_prefix
        )
        number_objects = response.get("KeyCount", 0)
        if number_objects == 0:
            return files_response
        for r in response["Contents"]:
            files_response["files"].append(r.get("Key"))
        return files_response

    def get_object(self, object_key):
        try:
            object_item = self.client.get_object(
                Bucket=self.bucket_name, Key=object_key
            )
            file_content = object_item["Body"].read()
            return file_content

        except Exception as e:
            print(f"Error {e}")

    def upload_file(self,s3_key, buffer):
        self.metadata["ContentType"] = "image/png"
        try:
            self.client.upload_fileobj(buffer, self.bucket_name, s3_key, ExtraArgs=self.metadata)
            return True
        except:
            return False
        
    def create_object(self, data):
        try:
            self.client.put_object(Body=data, Bucket=self.bucket_name, Key=self.token)
            return True
        except Exception as e:
            print(f"Error {e}")
            return False

    def update_object(self, data):
        try:
            existing_object = self.client.get_object(Bucket=self.bucket_name, Key=self.token)
            existing_object.update(data)
            json_string = json.dumps(existing_data, indent=2)
            # self.client.put_object(Body=data, Bucket=self.bucket_name, Key=self.token)
            return True
        except Exception as e:
            print(f"Error {e}")
            return False
    