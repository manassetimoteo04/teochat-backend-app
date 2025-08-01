export default function (roles, role) {
  if (roles.some((r) => r === role)) return;
  else {
    const error = new Error("Não tens permissão para executar está acção");
    error.statusCode = 401;
    throw error;
  }
}
