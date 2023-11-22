export async function POST(request: Request) {
  const body = await request.json();
  const res = await fetch(
    "https://hooks.zapier.com/hooks/catch/17142571/3k8qaw0/",
    {
      method: "POST",
      body: JSON.stringify({ ...body, apiKey: "SG.0Q5Z1Z5aQX2Z2QZ2" }),
    },
  );

  const data = await res.json();

  return Response.json(data);
}
