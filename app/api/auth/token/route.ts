import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const accessToken = (await cookies()).get("accessToken")?.value;

    if (!accessToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = NextResponse.json({ success: true, accessToken });

    return res;
}
