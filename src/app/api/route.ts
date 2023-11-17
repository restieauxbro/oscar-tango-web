import { serialize } from "cookie";

export async function POST(request: Request, params: { slug: string }) {
  const data: { password: string } = await request.json();
  const password = data.password;

  // Calculate the expiry date, 3 days from now
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 3);

  const cookie = serialize(process.env.PASSWORD_COOKIE_NAME!, "true", {
    httpOnly: true,
    path: "/",
    expires: expiryDate, // Set the expiry date
  });

  if (process.env.PAGE_PASSWORD !== password) {
    return new Response("incorrect password", {
      status: 401,
    });
  }

  return new Response("password correct", {
    status: 200,
    headers: {
      "Set-Cookie": cookie,
    },
  });
}
