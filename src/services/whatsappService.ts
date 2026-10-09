export const sendWhatsappOtp = async (phone: string, otp: string) => {
  const token = import.meta.env.VITE_WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = import.meta.env.VITE_WHATSAPP_PHONE_ID;
  const templateName = 'web_verify'; // Using the template you created

  // Clean the phone number (remove +, spaces, etc.)
  // Note: WhatsApp API expects the phone number with country code, but no '+'
  let cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.length === 10) {
    cleanPhone = '91' + cleanPhone; // Assume India if 10 digits
  }

  const url = `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`;

  const data = {
    messaging_product: 'whatsapp',
    to: cleanPhone,
    type: 'template',
    template: {
      name: templateName,
      language: {
        code: 'en', // Change this to 'en_US' or whatever language you selected for the template
      },
      components: [
        {
          type: 'body',
          parameters: [
            {
              type: 'text',
              text: otp,
            },
          ],
        },
        {
          type: 'button',
          sub_type: 'url',
          index: '0',
          parameters: [
            {
              type: 'text',
              text: otp,
            },
          ],
        },
      ],
    },
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    
    if (!response.ok) {
      console.error('WhatsApp API Error:', result);
      throw new Error(result.error?.message || 'Failed to send OTP');
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('Error sending OTP:', error);
    return { success: false, error };
  }
};
