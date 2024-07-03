import { atom } from 'jotai';
import { User } from './types';

export const initialData: User = {
  name: '',
  email: '',
  phone: '',
  role: '',
  address: '',
};

export const userModalAtom = atom(false);

export const userIdAtom = atom<number | null | undefined>(null);

export const currentPageAtom = atom(1);

export const userFormDataAtom = atom(initialData);
