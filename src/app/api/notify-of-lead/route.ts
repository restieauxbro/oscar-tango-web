// ES3 version of this const sgMail = require('@sendgrid/mail');
import { supabase } from "@/lib/supabase";
import sgMail from "@sendgrid/mail";

export type FormDetailsForAPI = {
  first_name: string;
  last_name: string;
  email: string;
  company_name?: string;
  phone?: string;
  message?: string;
  conversation?: any[];
  client_summary?: string;
  created_at?: Date;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as FormDetailsForAPI;
    const {
      first_name,
      last_name,
      email,
      company_name,
      phone,
      message,
      conversation,
      client_summary,
      created_at,
    } = body;

    const { error } = await supabase.from("ot_enquiries").insert([body]);

    if (error) {
      console.log("error adding to supabase", error);
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
    const msg = {
      to:
        process.env.VERCEL_ENV === "development"
          ? "tim@oscartango.digital"
          : "olly@oscartango.digital",
      from: "no-reply@oscartango.digital",
      subject: `Enquiry from ${first_name} ${last_name}`,
      // text: "",
      html: `<style>
      body {
        font-family: sans-serif;
        font-size: 1.2rem;
        line-height: 1.5;
      }
      p {
        margin-bottom: 1rem;
      }
      </style>
        <h1>New enquiry</h1>
        <p>Name: ${first_name} ${last_name}</p>
        <p>Email: <a href="mailto:${email}">${email}</a></p>
        ${company_name ? `<p>Company name: ${company_name}</p>` : ""}
        ${phone ? `<p>Phone: <a href="tel:${phone}">${phone}</a></p>` : ""}
        ${message ? `<p>Message: ${message}</p>` : ""}
        ${client_summary ? `<p>Client summary: ${client_summary}</p>` : ""}
        `,
    };
    sgMail.send(msg).then(() => {
      console.log("Email sent");
    });

    return Response.json("email sent");
  } catch (error) {
    if (error instanceof Error)
      return new Response(error.message, { status: 500 });
  }
}
