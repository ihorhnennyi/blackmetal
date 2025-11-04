export const validateEmail = (email: string): string | null => {
  if (!email.trim()) {
    return 'Email обов\'язковий';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Введіть коректний email';
  }

  return null;
};

export const validateName = (name: string): string | null => {
  const trimmedName = name.trim();
  
  if (!trimmedName) {
    return 'Ім\'я обов\'язкове';
  }

  if (trimmedName.length < 2) {
    return 'Ім\'я має містити мінімум 2 букви';
  }

  const nameRegex = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ'\s-]+$/;
  if (!nameRegex.test(trimmedName)) {
    return 'Ім\'я може містити тільки букви';
  }

  return null;
};

export const validateMessage = (message: string): string | null => {
  if (!message.trim()) {
    return 'Повідомлення обов\'язкове';
  }

  if (message.trim().length < 10) {
    return 'Повідомлення має містити мінімум 10 символів';
  }

  return null;
}; 