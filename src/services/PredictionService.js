// PredictionService.js

const API_BASE_URL = 'http://10.0.2.2:5149/api/Predict'; // Remplacez-le par l'URL réelle de votre backend

export const predictCardiacDisease = async (queryParams) => {
  try {
    const response = await fetch(`${API_BASE_URL}/CardiacPredict?${queryParams}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({}),
    });

    console.log('response', response);

    if (!response.ok) {
      throw new Error(`Prediction failed with status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    throw new Error(`Prediction failed: ${error.message}`);
  }
};

export const predictLungDisease = async (queryParams) => {
  try {
    const response = await fetch(`${API_BASE_URL}/LungPredict?${queryParams}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({}),
    });

    console.log('response', response);

    if (!response.ok) {
      throw new Error(`Prediction failed with status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    throw new Error(`Prediction failed: ${error.message}`);
  }
};


