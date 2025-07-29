// / src/app/api/auth/config/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  const config = {
    project_region: process.env.MISHRA_REGION,
    aws_cognito_region: process.env.MISHRA_REGION,
    aws_user_pools_id: process.env.MISHRA_USER_POOL_ID,
    aws_user_pools_web_client_id: process.env.MISHRA_USER_POOL_WEB_CLIENT_ID,
  };

  return NextResponse.json(config);
}