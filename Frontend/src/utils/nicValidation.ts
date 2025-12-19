import { differenceInYears } from 'date-fns';

export interface NICData {
  isValid: boolean;
  type: 'old' | 'new' | null;
  gender: 'Male' | 'Female' | null;
  birthDate: Date | null;
  age: number | null;
  error?: string;
  originalNic?: string;
}

export const validateNic = (nic: string): NICData => {
  nic = nic.trim();
  
  // Basic format checks
  const isOldType = /^[0-9]{9}[vVxX]$/.test(nic);
  const isNewType = /^[0-9]{12}$/.test(nic);

  if (!isOldType && !isNewType) {
    return {
      isValid: false,
      type: null,
      gender: null,
      birthDate: null,
      age: null,
      error: 'Invalid format. Must be 9 digits + V/X or 12 digits.',
    };
  }

  let year: number;
  let days: number;
  let type: 'old' | 'new';

  if (isOldType) {
    type = 'old';
    year = 1900 + parseInt(nic.substring(0, 2), 10);
    days = parseInt(nic.substring(2, 5), 10);
  } else {
    type = 'new';
    year = parseInt(nic.substring(0, 4), 10);
    days = parseInt(nic.substring(4, 7), 10);
  }

  // Validate days range
  if (days < 1 || days > 866) {
     return { isValid: false, type, gender: null, birthDate: null, age: null, error: 'Invalid days in NIC.' };
  }

  // Gender logic
  let gender: 'Male' | 'Female' = 'Male';
  if (days > 500) {
    gender = 'Female';
    days -= 500;
  }

  // Validate modified days (checking for leap years/valid dates handled vaguely here, but strictly we should check month boundaries)
  if (days < 1 || days > 366) {
      return { isValid: false, type, gender: null, birthDate: null, age: null, error: 'Invalid birth date encoded.' };
  }

  // Calculate Date
  // Day of year to Date object
  // A simple way is to create a date for Jan 1st of that year and add days-1
  const dob = new Date(year, 0); // Jan is 0
  dob.setDate(days);

  // Check if year matches (in case it spilled over 366 for non-leap)
  if (dob.getFullYear() !== year) {
       return { isValid: false, type, gender: null, birthDate: null, age: null, error: 'Invalid birth date calculation.' };
  }

  const age = differenceInYears(new Date(), dob);

  return {
    isValid: true,
    type,
    gender,
    birthDate: dob,
    age,
    originalNic: nic.toUpperCase()
  };
};
