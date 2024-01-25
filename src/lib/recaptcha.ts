declare const grecaptcha: any;

export const handleRecaptcha = async () => {
  // Create a token for the user based on their browser environment
  const token = await grecaptcha.enterprise?.execute(
    "6LcYsCUpAAAAAL2k6jL8Mn2AutiUC9U8igN2ivtz",
    {
      action: "LOGIN",
    },
  );
  // Send the the token to our server for verification
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, action: "LOGIN" }),
  };
  let res = await fetch("/api/recaptcha", options);
  const resJson = await res.json();
  console.log(resJson);
  const score = await resJson?.score;
  if (score > 0.2) {
    return true;
  } else {
    return false;
  }
};
