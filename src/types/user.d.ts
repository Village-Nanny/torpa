export interface UserDocument {
  uid: string;

  parentFirstName: string;
  parentLastName: string;
  parentEmail: string;
  parentPhoneNumber: string;

  childFirstName: string;
  childDateOfBirth: string;
  childGender: 'male' | 'female' | 'other';

  createdAt: string;
  updatedAt: string;
}
