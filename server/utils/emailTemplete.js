export const registrationWelcomeTemplate = (name) => `
  <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: white; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <div style="background-color: #27ae60; color: white; padding: 20px; text-align: center;">
        <h2>👋 Welcome to Smart Healthcare</h2>
      </div>
      <div style="padding: 30px;">
        <p>Dear <strong>${name}</strong>,</p>
        <p>We're thrilled to have you on board!</p>
        <p>With Smart Healthcare, you can easily manage appointments, prescriptions, lab results, and more.</p>
        <p>Stay healthy, stay connected!</p>
        <br />
        <p style="font-size: 14px; color: #888;">Smart Healthcare Team</p>
      </div>
    </div>
  </div>
`;
