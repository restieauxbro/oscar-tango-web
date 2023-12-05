import { RecaptchaEnterpriseServiceClient } from "@google-cloud/recaptcha-enterprise";

export async function POST(req: any) {
  const client = new RecaptchaEnterpriseServiceClient({
    credentials: {
      client_email:
        "website-service-account@oscar-tango-webs-1701728987496.iam.gserviceaccount.com",
      private_key:
        process.env.GOOGLE_IAM_SERVICE_ROLE_KEY,
    },
  });
  const projectPath = client.projectPath("oscar-tango-webs-1701728987496");
  const body = await req.json();
  const { token } = body;

  const request = {
    assessment: {
      event: {
        token,
        siteKey: "6LcYsCUpAAAAAL2k6jL8Mn2AutiUC9U8igN2ivtz",
      },
    },
    parent: projectPath,
  };
  const [response] = await client.createAssessment(request);
  if (!response.tokenProperties?.valid) {
    return new Response("Invalid token", {
      status: 400,
    });
  }

  if (response.tokenProperties.action === "LOGIN") {
    return Response.json({
      score: response?.riskAnalysis?.score,
      reason: response.riskAnalysis?.reasons,
      status: "Ok",
    });
  } else {
    return Response.json({
      reason: response.riskAnalysis?.reasons,
      status: "Fail",
    });
  }
}
