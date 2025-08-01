import { NextRequest, NextResponse } from 'next/server';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';

// Initialize DynamoDB client
const client = new DynamoDBClient({
  region: process.env.MISHRA_AWS_REGION || 'us-east-1', // fallback region
  credentials: {
    accessKeyId: process.env.MISHRA_ACCESS_KEY_ID!,
    secretAccessKey: process.env.MISHRA_SECRET_ACCESS_KEY!,
  },
});

const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME!;

// POST - Create a new contact
export async function POST(request: NextRequest) {
  try {
    // Debug: Check if environment variables are loaded (REMOVE THIS IN PRODUCTION)
    console.log('Environment check:');
    console.log('AWS_REGION:', process.env.MISHRA_AWS_REGION ? 'Set' : 'NOT SET');
    console.log('ACCESS_KEY_ID:', process.env.MISHRA_ACCESS_KEY_ID ? 'Set' : 'NOT SET');
    console.log('SECRET_ACCESS_KEY:', process.env.MISHRA_SECRET_ACCESS_KEY ? 'Set' : 'NOT SET');
    console.log('TABLE_NAME:', process.env.DYNAMODB_TABLE_NAME ? 'Set' : 'NOT SET');
    const body = await request.json();
    const { phone_number, email, name, work } = body;

    // Validate required fields
    if (!phone_number || !name || !work) {
      return NextResponse.json(
        { 
          error: 'Missing required fields', 
          message: 'phone_number, name, and work are required' 
        },
        { status: 400 }
      );
    }

    // Create item object with optional email
    const item = {
      phone_number,
      name,
      work,
      email: email || undefined, // Will be undefined if email is falsy
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Put item in DynamoDB
    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: item,
    });

    await docClient.send(command);

    return NextResponse.json(
      { 
        message: 'Contact created successfully', 
        data: item 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: 'Failed to create contact' 
      },
      { status: 500 }
    );
  }
}

// GET - Retrieve contacts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const phone_number = searchParams.get('phone_number');

    if (phone_number) {
      // Get specific contact by phone_number (primary key)
      const command = new GetCommand({
        TableName: TABLE_NAME,
        Key: {
          phone_number: phone_number,
        },
      });

      const result = await docClient.send(command);

      if (!result.Item) {
        return NextResponse.json(
          { 
            error: 'Contact not found',
            message: `No contact found with phone number: ${phone_number}` 
          },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { 
          message: 'Contact retrieved successfully', 
          data: result.Item 
        },
        { status: 200 }
      );

    } else {
      // Get all contacts (scan operation)
      const command = new ScanCommand({
        TableName: TABLE_NAME,
      });

      const result = await docClient.send(command);

      return NextResponse.json(
        { 
          message: 'Contacts retrieved successfully', 
          data: result.Items || [],
          count: result.Count || 0
        },
        { status: 200 }
      );
    }

  } catch (error) {
    console.error('Error retrieving contacts:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: 'Failed to retrieve contacts' 
      },
      { status: 500 }
    );
  }
}