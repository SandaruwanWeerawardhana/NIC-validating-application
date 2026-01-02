import { differenceInYears } from "date-fns";

export interface NICData {
  isValid: boolean;
  type: "old" | "new" | null;
  gender: "MALE" | "FEMALE" | null;
  birthDate: Date | null;
  age: number | null;
  error?: string;
  originalNic?: string;
}

export const validateNic = (nic: string): NICData => {
  nic = nic.trim();

  const isOldType = /^\d{9}[vVxX]$/.test(nic);
  const isNewType = /^\d{12}$/.test(nic);

  if (!isOldType && !isNewType) {
    return {
      isValid: false,
      type: null,
      gender: null,
      birthDate: null,
      age: null,
      error: "Invalid format. Must be 9 digits + V/X or 12 digits.",
    };
  }

  let year: number;
  let days: number;
  let type: "old" | "new";

  if (isOldType) {
    type = "old";
    year = 1900 + Number.parseInt(nic.substring(0, 2), 10);
    days = Number.parseInt(nic.substring(2, 5), 10);
  } else {
    type = "new";
    year = Number.parseInt(nic.substring(0, 4), 10);
    days = Number.parseInt(nic.substring(4, 7), 10);
  }

  if (days < 1 || days > 866) {
    return {
      isValid: false,
      type,
      gender: null,
      birthDate: null,
      age: null,
      error: "Invalid days in NIC.",
    };
  }

  let gender: "MALE" | "FEMALE" = "MALE";
  if (days > 500) {
    gender = "FEMALE";
    days -= 500;
  }

  if (days < 1 || days > 366) {
    return {
      isValid: false,
      type,
      gender: null,
      birthDate: null,
      age: null,
      error: "Invalid birth date encoded.",
    };
  }

  const dob = new Date(year, 0);
  dob.setDate(days);

  if (dob.getFullYear() !== year) {
    return {
      isValid: false,
      type,
      gender: null,
      birthDate: null,
      age: null,
      error: "Invalid birth date calculation.",
    };
  }

  const age = differenceInYears(new Date(), dob);

  return {
    isValid: true,
    type,
    gender,
    birthDate: dob,
    age,
    originalNic: nic.toUpperCase(),
  };
};
