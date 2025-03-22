// src/index.ts
import { noRepositoryAntiPatterns } from './rules/no-layering-anti-patterns'

export default {
  rules: {
    'no-repository-anti-patterns': noRepositoryAntiPatterns,
  },
}
