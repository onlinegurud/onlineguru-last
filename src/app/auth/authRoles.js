export const authRoles = {
  sa: ['SA'], // Only Super Admin has access
  admin: ['SA', 'ADMIN'], // Only SA & Admin has access
  teacher: ['SA', 'ADMIN', 'TEACHER'], // Only SA & Admin & Editor has access
  student: ['SA', 'ADMIN', 'STUDENT'], // Everyone has access
};
