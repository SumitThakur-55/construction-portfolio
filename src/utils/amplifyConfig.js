// src/utils/amplifyConfig.js
import { Amplify } from 'aws-amplify';

export async function configureAmplify() {
  try {
    const response = await fetch('/api/auth/config');
    const config = await response.json();
    
    Amplify.configure({
      Auth: {
        Cognito: {
          region: config.project_region,
          userPoolId: config.aws_user_pools_id,
          userPoolClientId: config.aws_user_pools_web_client_id
        }
      }
    });
  } catch (error) {
    console.error('Error configuring Amplify:', error);
  }
}