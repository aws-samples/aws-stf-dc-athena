#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { StfDcAthenaTableStack } from '../lib/stf-dc-athena-table-stack'
import { StfDcAthenaDatabaseStack } from '../lib/stf-dc-athena-database-stack'
import { IndoorEnvironmentObserved } from '../schema'
import { Aws } from 'aws-cdk-lib'
import { Bucket } from 'aws-cdk-lib/aws-s3'
import { StfDcAthenaOutputStack } from '../lib/stf-dc-athena-output-stack'

const app = new cdk.App()


// COMMENT IF YOU HAVE ALREADY CONFIGURED A BUCKET FOR ATHENA QUERY RESULTS
const athena_output = new StfDcAthenaOutputStack(app, 'StfDcAthenaOutput')

// COMMENT IF YOU HAVE ALREADY AN ATHENA DATABASE 
const stf_database = new StfDcAthenaDatabaseStack(app, `StfDcAthenaDatabaseStack`)

// CHANGE BUCKET NAME IF NOT DEFAULT USED
const bucket_name = `stf-iot-datalake-${Aws.REGION}-${Aws.ACCOUNT_ID}`

// EXAMPLE WITH INDOOR ENVIRONEMENT OBSERVED TABLE 
const indoorenv_table = new StfDcAthenaTableStack(app, 'StfDcAthenaIndoorEnvTableStack', {
    type: 'IndoorEnvironmentObserved',
    schema: IndoorEnvironmentObserved, 
    bucket_name 
})

