AWS cleanup project

Cleanups following services for the regions configured in config.json

- EC2 Instances
- Elastic IPs
- Elastic Load Balancers (ELBs)

## Installing

Open terminal & execute the following commands to execute

```sh
git clone https://github.com/hsachdevah/aws-cleanup-node.git
cd aws-cleanup-node
npm install
```

Note: 
Create a file with name "aws-credentials.json" in the same directory as cleanup.js and add the following content

{ 
	"accessKeyId": "<your AWS access key>", 
	"secretAccessKey": "<your AWS secret key>", 
	"region": "us-east-1" 
}

The given access key & secret key should have all the permissions to list/delete AWS resources.