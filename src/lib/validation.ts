export interface FormErrors {
  [key: string]: string;
}

export const validateCustomerForm = (data: any): FormErrors => {
  const errors: FormErrors = {};

  if (!data.name.trim()) errors.name = "Name is required.";
  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Email is invalid.";
  }
  if (!data.phone.trim()) {
    errors.phone = "Phone is required.";
  } else if (!/^\d+$/.test(data.phone)) {
    errors.phone = "Phone must be a number.";
  }
  if (!data.favorite_menu.toString().trim()) {
    errors.favorite_menu = "Favorite menu is required.";
  }
  if (!data.total_transaction.toString().trim()) {
    errors.total_transaction = "Total transaction is required.";
  } else if (isNaN(Number(data.total_transaction))) {
    errors.total_transaction = "Total transaction must be a number.";
  }

  return errors;
};
