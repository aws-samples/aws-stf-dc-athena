import { Aws, Stack, StackProps } from 'aws-cdk-lib'
import { CfnWorkGroup } from 'aws-cdk-lib/aws-athena'
import { Bucket } from 'aws-cdk-lib/aws-s3'
import { AwsCustomResource, PhysicalResourceId, PhysicalResourceIdReference } from 'aws-cdk-lib/custom-resources'

import { Construct } from 'constructs'
import { Parameters } from '../parameters'

export class StfDcAthenaOutputStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const bucket_name = `stf-iot-datalake-${Aws.REGION}-${Aws.ACCOUNT_ID}-athena-results`

    const bucket_output = new Bucket(this,'BucketAthenaOutput', {
        bucketName: bucket_name
    })

    const athena_workgroup = new CfnWorkGroup(this, 'AthenaWorkgroup', {
        name: 'stf', 
        state: 'ENABLED',
        workGroupConfiguration: {
            resultConfiguration: {
                outputLocation: `s3://${bucket_name}/`
            }
        }
    })
    
  }
}