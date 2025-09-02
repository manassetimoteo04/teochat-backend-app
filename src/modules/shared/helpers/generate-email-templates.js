export const generateEmailTemplate = ({
  templateType = "convite",
  title,
  subtitle,
  mainContent,
  actionLink,
  actionText,
  companyName = "TeoChat",
  teamName = "Equipe",
  secondaryContent,
  footerNote = "Esta mensagem foi gerada automaticamente. Por favor, não responda.",
  userData = {},
}) => {
  const templates = {
    convite: {
      title: `Convite para entrar na empresa ${companyName}`,
      subtitle: `Você foi convidado a se juntar à equipe ${
        teamName || companyName
      }`,
      bgColor:
        "linear-gradient(135deg, rgba(34,197,94,0.15) 0%, rgba(16,185,129,0.15) 100%)",
      borderColor: "rgba(34, 197, 94, 0.25)",
      mainContent: `
        <p style="font-size: 16px; color: #111827; margin: 0 0 10px; text-align: center;">
          <strong>${
            userData.inviter || "Um administrador"
          }</strong> convidou você para se juntar à equipe 
          <strong>${teamName}</strong> em <strong>${companyName}</strong>.
        </p>
        <p style="font-size: 14px; color: #4b5563; margin: 0 0 15px; text-align: center;">
          Clique no botão abaixo para aceitar o convite e começar a colaborar com a equipe.
        </p>
      `,
      actionText: "Aceitar convite",
    },
    welcome: {
      title: `Bem-vindo(a) ao ${companyName}, ${userData.name || "Usuário"}!`,
      subtitle: "Estamos felizes em ter você com a gente.",
      bgColor:
        "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.15) 100%)",
      borderColor: "rgba(37, 99, 235, 0.25)",
      mainContent: `
        <p style="font-size: 15px; color: #111827; text-align: center;">
          Agora você faz parte da nossa comunidade 🚀. Explore as funcionalidades do ${companyName} 
          e aproveite ao máximo a colaboração em equipe.
        </p>
      `,
      actionText: "Acessar plataforma",
    },
    verification: {
      title: "Verifique a sua conta",
      subtitle: "Aqui está o seu código de confirmação:",
      bgColor:
        "linear-gradient(135deg, rgba(234,179,8,0.15) 0%, rgba(202,138,4,0.15) 100%)",
      borderColor: "rgba(202,138,4,0.25)",
      mainContent: `
        <p style="font-size: 32px; font-weight: 700; text-align: center; margin: 10px 0; color: #ca8a04;">
          ${userData.code || "123456"}
        </p>
        <p style="font-size: 14px; color: #4b5563; text-align: center;">
          Este código expira em 10 minutos.
        </p>
      `,
    },
    resetPassword: {
      title: "Recuperação de Senha",
      subtitle: "Recebemos uma solicitação para redefinir sua senha.",
      bgColor:
        "linear-gradient(135deg, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.15) 100%)",
      borderColor: "rgba(220,38,38,0.25)",
      mainContent: `
        <p style="font-size: 15px; color: #111827; text-align: center; margin-bottom: 20px;">
          Clique no botão abaixo para criar uma nova senha. Se não foi você que solicitou, ignore este email.
        </p>
      `,
      actionText: "Redefinir senha",
    },
    security: {
      title: "Alerta de Segurança",
      subtitle: "Detectamos uma atividade suspeita em sua conta",
      bgColor:
        "linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(147,51,234,0.15) 100%)",
      borderColor: "rgba(147,51,234,0.25)",
      mainContent: `
        <p style="font-size: 15px; color: #111827; margin: 0 0 10px;">
          Olá <strong>${
            userData.name || "usuário"
          }</strong>, houve um login não reconhecido.
        </p>
        <p style="font-size: 14px; color: #4b5563;">
          <strong>Dispositivo:</strong> ${
            userData.device || "Desconhecido"
          } <br/>
          <strong>Localização:</strong> ${
            userData.location || "Não identificada"
          }
        </p>
        <p style="font-size: 14px; color: #dc2626; margin-top: 15px;">
          Caso não tenha sido você, recomendamos alterar sua senha imediatamente.
        </p>
      `,
      actionText: "Proteger minha conta",
    },
  };

  const config = templates[templateType] || templates.convite;

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${title || config.title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="font-family: 'Inter', Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 0;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <!-- Header -->
    <tr>
      <td align="center" style="padding: 40px 0 20px;">
        <h1 style="margin: 0; font-weight: 700; font-size: 28px; color: #16a34a;">
          ${companyName}
        </h1>
      </td>
    </tr>

    <!-- Card -->
    <tr>
      <td align="center">
        <div style="
          background: ${config.bgColor};
          border: 1px solid ${config.borderColor};
          border-radius: 16px;
          padding: 32px 24px;
          width: 90%;
          max-width: 600px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.05);
          backdrop-filter: blur(12px);
        ">
          <h2 style="margin: 0 0 10px; color: #111827; font-weight: 600; font-size: 20px;">
            ${title || config.title}
          </h2>
          <p style="margin: 0 0 20px; color: #374151; font-size: 15px; line-height: 1.5;">
            ${subtitle || config.subtitle}
          </p>

          <div style="
            background: rgba(255, 255, 255, 0.6);
            border-radius: 12px;
            padding: 20px;
            margin: 20px 0;
            border: 1px solid ${config.borderColor};
          ">
            ${mainContent || config.mainContent || ""}
          </div>

          ${
            actionLink && (actionText || config.actionText)
              ? `
            <a href="${actionLink}" target="_blank" 
               style="
                 display: inline-block;
                 padding: 14px 28px;
                 background: linear-gradient(135deg, #22c55e, #16a34a);
                 color: white;
                 text-decoration: none;
                 border-radius: 10px;
                 font-weight: 600;
                 font-size: 15px;
                 box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
               ">
              ${actionText || config.actionText}
            </a>
          `
              : ""
          }

          ${
            secondaryContent
              ? `<div style="margin-top: 25px; font-size: 14px; color: #4b5563; line-height: 1.6;">${secondaryContent}</div>`
              : ""
          }
        </div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td align="center" style="padding: 30px 0;">
        <p style="font-size: 12px; color: #9ca3af; max-width: 600px; margin: 0 auto; padding: 0 20px; line-height: 1.4;">
          ${footerNote}<br>
          © ${new Date().getFullYear()} ${companyName}. Todos os direitos reservados.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`;
};

export const upcomingEventTemplate = ({
  teamName,
  companyName,
  eventName,
  eventDate,
  eventTime,
  eventLink,
}) => `
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <title>Lembrete de Evento</title>
    <style>
      body {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background: #f4f6f8;
        padding: 0;
        margin: 0;
        color: #333;
      }
      .wrapper {
        max-width: 600px;
        margin: 30px auto;
        background: #fff;
        border-radius: 14px;
        overflow: hidden;
        box-shadow: 0 4px 10px rgba(0,0,0,0.08);
      }
      .header {
        background: linear-gradient(135deg, #9333ea, #7e22ce);
        color: #fff;
        padding: 20px;
        text-align: center;
      }
      .header h1 {
        margin: 0;
        font-size: 20px;
      }
      .content {
        padding: 25px;
      }
      .content h2 {
        font-size: 22px;
        color: #111;
      }
      .content p {
        line-height: 1.6;
        margin: 12px 0;
      }
      .details {
        background: #f9f9fb;
        border-radius: 10px;
        padding: 15px;
        margin: 20px 0;
        border: 1px solid #e5e7eb;
      }
      .btn {
        display: inline-block;
        margin-top: 20px;
        padding: 12px 20px;
        background: #9333ea;
        color: #fff !important;
        text-decoration: none;
        border-radius: 8px;
        font-weight: bold;
        transition: background 0.2s ease;
      }
      .btn:hover {
        background: #7e22ce;
      }
      .footer {
        font-size: 12px;
        color: #888;
        text-align: center;
        padding: 20px;
        border-top: 1px solid #eee;
        background: #fafafa;
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="header">
        <h1>${teamName} • ${companyName}</h1>
      </div>
      <div class="content">
        <h2>📅 Lembrete de Evento</h2>
        <p>Olá! O evento <strong>${eventName}</strong> que você faz parte está chegando.</p>
        
        <div class="details">
          <p><strong>Equipe:</strong> ${teamName}</p>
          <p><strong>Empresa:</strong> ${companyName}</p>
          <p><strong>Data:</strong> ${eventDate}</p>
          <p><strong>Hora:</strong> ${eventTime}</p>
        </div>
        
        <a class="btn" href="${eventLink}">➡ Acessar Evento</a>
      </div>
      <div class="footer">
        <p>Você recebeu este lembrete porque é membro da equipe <strong>${teamName}</strong> na <strong>${companyName}</strong>.</p>
        <p>Se não quiser mais receber notificações, ajuste suas preferências no app.</p>
        <p>&copy; ${new Date().getFullYear()} ${companyName}. Todos os direitos reservados.</p>
      </div>
    </div>
  </body>
</html>
`;
