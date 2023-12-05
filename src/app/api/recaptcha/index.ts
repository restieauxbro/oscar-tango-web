import { RecaptchaEnterpriseServiceClient } from "@google-cloud/recaptcha-enterprise";

const PROJECT_ID = "oscar-tango-webs-1701728987496";

export default async function createAssessment(req: any, res: any) {
  const client = new RecaptchaEnterpriseServiceClient();
  const projectPath = client.projectPath(PROJECT_ID);
  const request = {
    assessment: {
      event: {
        token: req?.body.token,
        siteKey: '6LcYsCUpAAAAAL2k6jL8Mn2AutiUC9U8igN2ivtz',
      },
    },
    parent: projectPath,
  };
  const [response] = await client.createAssessment(request);
  if (!response.tokenProperties?.valid) {
    res.status(400)?.json({
      message: "Invalid token",
      score: response?.riskAnalysis?.score,
      reason: response.tokenProperties?.invalidReason,
    });
    return;
  }

  if (response.tokenProperties.action === "LOGIN") {
    return res.status(200)?.json({
      score: response?.riskAnalysis?.score,
      reason: response.riskAnalysis?.reasons,
      status: "Ok",
    });
  } else {
    return res.status(500)?.json({
      reason: response.riskAnalysis?.reasons,
      status: "Fail",
    });
  }
}
