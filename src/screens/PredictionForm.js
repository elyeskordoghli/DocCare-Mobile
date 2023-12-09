import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const categoryForms = {
  '1': ['Age', 'Pression_arterielle', 'Cholesterol'],
  '2': ['toux', 'essoufflement', 'fièvre', 'douleur_thoracique', 'expectorations', 'fatigue'],
  // Ajoutez plus de catégories et de champs au besoin
};

const CategoryForm = ({ categoryId, onSubmit }) => {
  const initialState = {};
  categoryForms[categoryId].forEach(field => {
    initialState[field] = '';
  });

  const [formValues, setFormValues] = useState(initialState);

  const handleChange = (field, value) => {
    setFormValues(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const submitForm = () => {
    onSubmit(formValues);
    // Ajoutez ici la logique pour traiter les données du formulaire
  };

  return (
    <View>
      <Text>{`Category ${categoryId} Form`}</Text>
      {categoryForms[categoryId].map((field, index) => (
        <TextInput
          key={index}
          placeholder={`Enter ${field}`}
          value={formValues[field]}
          onChangeText={(text) => handleChange(field, text)}
        />
      ))}
      <Button title="Submit" onPress={submitForm} />
    </View>
  );
};

const PredictionForm = ({ route }) => {
  const { categoryId } = route.params;
  const [formValues, setFormValues] = useState(null);

  const submitForm = (data) => {
    console.log('Form Data:', data);
    // Ajoutez ici la logique pour traiter les données du formulaire
  };

  return (
    <View>
      <Text>Prediction Form for Category {categoryId}</Text>

      {/* Conditionnellement rendre le formulaire en fonction de la catégorie sélectionnée */}
      {categoryForms[categoryId] && (
        <CategoryForm categoryId={categoryId} onSubmit={setFormValues} />
      )}

      {/* Afficher un bouton de soumission après la sélection d'un formulaire */}
      {formValues && (
        <Button title="Submit" onPress={() => submitForm(formValues)} />
      )}
    </View>
  );
};

export default PredictionForm;
