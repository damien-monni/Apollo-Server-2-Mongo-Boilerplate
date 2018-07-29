const roles = ['ADMIN', 'USER'];

const userHasRole = (user, roleToHave) => {
  const { role } = user || {};

  console.log(user);

  if (!role) {
    return roleToHave === 'UNKNOWN';
  }

  const roleIndex = roles.indexOf(role);
  const roleToHaveIndex = roles.indexOf(roleToHave);
  return roleIndex <= roleToHaveIndex;
};

export default userHasRole;
