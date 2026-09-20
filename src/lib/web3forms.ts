// Sends a form to Web3Forms. Used by both the contact form and the booking form.
// Any extra fields (phone, service, date, time...) are included in the email.
export async function submitToWeb3Forms(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
  [field: string]: string;
}): Promise<{ success: boolean; error?: string }> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as
    | string
    | undefined;

  if (!accessKey) {
    return {
      success: false,
      error:
        "This form is not yet connected. The site owner needs to add a Web3Forms access key.",
    };
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        from_name: "Ayoub Portfolio",
        ...payload,
      }),
    });

    const data = await res.json();

    if (data.success) {
      return { success: true };
    }

    return { success: false, error: data.message || "Submission failed." };
  } catch {
    return {
      success: false,
      error: "Something went wrong while sending your message. Please try again.",
    };
  }
}
