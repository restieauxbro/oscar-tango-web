import { serialize } from "cookie";

export async function POST(request: Request) {
  const data: { password: string; client: string } = await request.json();
  const { password, client } = data;
  console.log("client", client);

  // Calculate the expiry date, 3 days from now
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 3);

  const cookie = serialize(`${client}-logged-in`, "true", {
    httpOnly: true,
    secure: true,
    path: "/",
    expires: expiryDate, // Set the expiry date
  });

  const passwords = {
    "oscar-tango": "BongoKnows",
    "client-a": "client-a-password",
    "client-b": "client-b-password",
  };

  if (!passwords[client as keyof typeof passwords]) {
    return new Response("Not a client", {
      status: 404,
    });
  }
  if (password !== passwords[client as keyof typeof passwords]) {
    return new Response("password incorrect", {
      status: 401,
    });
  }
  console.log("password correct");
  return new Response("password correct", {
    status: 200,
    headers: {
      "Set-Cookie": cookie,
    },
  });
}
