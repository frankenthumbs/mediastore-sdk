const resetPassword = async (offerId, customerEmail) => {
  const url = `${ENVIRONMENT_CONFIGURATION.GB_API_URL}/customers/passwords`;

  try {
    const res = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify({ offerId, customerEmail }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const json = await res.json();
    if (json.message) {
      return {
        ...json,
        errors: [json.message]
      };
    }
    return json;
  } catch (error) {
    return {
      errors: [error.message]
    };
  }
};

export default resetPassword;
