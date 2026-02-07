import { createContext } from 'react';
import es from '../locales/es.json';
import en from '../locales/en.json';
import gl from '../locales/gl.json';
import ca from '../locales/ca.json';

export const LanguageContext = createContext();
export const translations = { es, en, gl, ca };
