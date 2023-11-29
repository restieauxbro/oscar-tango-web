import { ReactNode } from "react";
import { cookies } from "next/headers";
import PasswordPromptDialog from "./password-prompt-dialog";

const AuthWall = ({
  children,
  client,
}: {
  children: ReactNode;
  client: string;
}) => {
  const cookiesStore = cookies();
  const oscarTangoSuperLogin = cookiesStore.get(`oscar-tango-logged-in`);
  const clientAuthCookie = cookiesStore.get(`${client}-logged-in`);
  const isLoggedIn = !!oscarTangoSuperLogin?.value || !!clientAuthCookie?.value;

  // console.log({ oscarTangoSuperLogin, clientAuthCookie });

  if (isLoggedIn) return children;
  else return <PasswordPromptDialog {...{ client }} />;
};

export default AuthWall;
