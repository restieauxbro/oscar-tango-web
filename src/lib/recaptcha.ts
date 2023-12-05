declare const grecaptcha: any;

export const handleRecaptcha = async (action: "LOGIN", key: string) => {
  const token = await grecaptcha.enterprise?.execute(key, {
    action: action,
  });
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, action: action }),
  };
  let res = await fetch("/api/recaptcha", options);
  const resJson = await res.json();
  const score = await resJson?.score;
  if (score > 0.6) {
    return true;
  } else {
    return false;
  }
};
