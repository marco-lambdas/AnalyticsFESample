#!/bin/bash

SCRIPT_NAME=${0##*/}
ENVIRONMENT=$1

if [ -z "$SCRIPT_NAME" ]
then
    echo "Usage: build-and-deploy_sh.sh server-name"
    echo "Server Names: live OR test"
    exit 1
fi

# convert to lower case
ENVIRONMENT=`echo $ENVIRONMENT | tr '[A-Z]' '[a-z]'`

# check if the environment argument is live or test
if [[ $ENVIRONMENT != "live" && $ENVIRONMENT != "test" ]]
then
    echo "Usage: ${SCRIPT_NAME} environment"
    echo "Enviroment Names: LIVE or TEST"
    exit 1
fi

echo "Check environment"
if [ ${ENVIRONMENT} = "live" ]
then
        S3_BUCKET_NAME="analytics-fe-production"
	DISTRIBUTION_ID="E3N8A4463420KY"
        # BUILD="build:production"
        BUILD="build"
else
        S3_BUCKET_NAME="analytics-fe-dev"
	DISTRIBUTION_ID="E2XBTNP9ESBNH"
        BUILD="build:development"
fi

echo "Check AWS cli version"
if [[ "$(command -v aws2)" ]]
then
        aws_exec="aws2"
else
        aws_exec="aws"
fi

echo "Instaling packages"
npm install

echo "Building"
npm run ${BUILD}

if [ $? != "0" ]
then
	echo "Build FAIL"
	exit 1
fi

echo "Build ok"

echo "Deploying for ${ENVIRONMENT} environment"

echo "Deploying via AWS CLI"
$aws_exec s3 sync --delete ./build s3://$S3_BUCKET_NAME --acl public-read --profile coredocs

echo "Setting cache invalidations"
$aws_exec s3 cp --acl public-read --cache-control="max-age=0, no-cache, no-store, must-revalidate" ./build/service-worker.js s3://$S3_BUCKET_NAME --profile coredocs
$aws_exec s3 cp --acl public-read --cache-control="max-age=0, no-cache, no-store, must-revalidate" ./build/index.html s3://$S3_BUCKET_NAME --profile coredocs

echo "Creating CloudFront invalidation"
$aws_exec cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths /\* --profile coredocs

# echo "Remove Remote Tag ${ENVIRONMENT}"
# git push --delete origin ${ENVIRONMENT}

# echo "Remove Local Tag ${ENVIRONMENT}"
# git tag -d ${ENVIRONMENT}

# echo "Set Local Tag ${ENVIRONMENT}"
# git tag ${ENVIRONMENT}

# echo "Push Remote Tag ${ENVIRONMENT}"
# git push origin ${ENVIRONMENT}
