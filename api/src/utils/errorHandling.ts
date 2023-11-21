export const getMongooseValidationErrors = (error: any) => {
  const validationErrors = [] as any;
  for (const key in error.errors) {
    if (error.errors.hasOwnProperty(key)) {
      validationErrors.push({
        key,
        message: error.errors[key].message,
      });
    }
  }

  return validationErrors;
};
