import { authRoles, rolePrecedence } from "constants/authOptionsConstants.js";

export const getSortedRoles = ({ roles, higherPrecedence = true }) => {
  let sortedRoles = [...roles];
  return sortedRoles?.sort((a, b) => {
    return higherPrecedence
      ? rolePrecedence[b] - rolePrecedence[a]
      : rolePrecedence[a] - rolePrecedence[b];
  });
};

export const isAnonymous = ({ roles }) => {
  return roles?.includes(authRoles.ANONYMOUS);
};

export const isAdmin = ({ roles }) => {
  return roles?.includes(authRoles.ADMIN);
};

export const isUser = ({ roles }) => {
  return roles?.includes(authRoles.USER);
};
