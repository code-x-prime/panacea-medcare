import { NextResponse } from 'next/server';
import { Client } from 'pg';
import bcrypt from 'bcryptjs';

export async function GET() {
    let client;
    try {
        console.log('Connecting to database...');
        client = new Client({
            connectionString: process.env.DATABASE_URL,
        });
        await client.connect();

        const email = 'admin@panaceamedcare.com';
        const password = 'Admin@123';

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create Admin
        const query = `
      INSERT INTO "AdminUser" (email, password, "createdAt")
      VALUES ($1, $2, NOW())
      ON CONFLICT (email) DO UPDATE SET password = $2
      RETURNING id, email;
    `;

        const res = await client.query(query, [email, hashedPassword]);

        await client.end();

        return NextResponse.json({
            success: true,
            message: 'Admin user created/updated successfully',
            email,
            password
        });
    } catch (error) {
        if (client) await client.end();
        console.error('Error creating admin:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
