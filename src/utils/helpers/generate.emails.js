export const generateEmailsHtml = ({ eventTitle, eventTime, eventLink }) => `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Lembrete de Evento</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding: 20px 0; background-color: #4f46e5; color: #ffffff;">
        <h1 style="margin: 0;">📅 TeoTeam</h1>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 30px; background-color: #ffffff;">
        <h2 style="color: #333;">O seu evento começa em 10 minutos!</h2>
        <p style="font-size: 16px; color: #555;">
          Você tem um evento agendado: <strong>${eventTitle}</strong>
        </p>
        <p style="font-size: 14px; color: #555;">
          Horário de início: <strong>${eventTime}</strong>
        </p>
        <a href="${eventLink}" target="_blank" 
           style="display: inline-block; padding: 12px 20px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 5px; margin-top: 15px;">
          Entrar no Evento
        </a>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 15px; font-size: 12px; color: #999;">
        Este é um lembrete automático. Não responda este e-mail.
      </td>
    </tr>
  </table>
</body>
</html>
`;
