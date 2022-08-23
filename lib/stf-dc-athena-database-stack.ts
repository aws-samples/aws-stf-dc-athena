import { Aws, Stack, StackProps } from 'aws-cdk-lib'
import { CfnDatabase } from 'aws-cdk-lib/aws-glue'
import { Construct } from 'constructs'
import { Parameters } from '../parameters'

export class StfDcAthenaDatabaseStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const glue_db = new CfnDatabase(this, 'StfDatabase', {
      catalogId: Aws.ACCOUNT_ID,
      databaseInput: {
        name: Parameters.databaseName
      }
    })
    
  }
}
