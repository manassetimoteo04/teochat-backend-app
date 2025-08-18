export const generateEmailTemplate = ({
  templateType = "event",
  title,
  subtitle,
  mainContent,
  actionLink,
  actionText = "Take Action",
  companyName = "Your Company",
  teamName = "Your Team",
  secondaryContent,
  footerNote = "Esta mensagem foi gerada automaticamente. Por favor não responda.",
  userData = {},
}) => {
  const templates = {
    welcome: {
      title: `Welcome to ${companyName}, ${userData.name || "User"}!`,
      subtitle: "We're excited to have you on board",
      bgColor:
        "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.15) 100%)",
      borderColor: "rgba(255, 255, 255, 0.18)",
    },
    verification: {
      title: "Verifique a tua Conta",
      subtitle: "Aqui está a o teu código de confirmação",
      bgColor:
        "linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(5,150,105,0.15) 100%)",
      borderColor: "rgba(255, 255, 255, 0.18)",
    },
    event: {
      title: "Lembre de Eventos Próximos",
      subtitle: "o teu evento começa em 10 minutos",
      bgColor:
        "linear-gradient(135deg, rgba(236,72,153,0.15) 0%, rgba(219,39,119,0.15) 100%)",
      borderColor: "rgba(255, 255, 255, 0.18)",
    },
    security: {
      title: "Security Alert",
      subtitle: "Important security notice",
      bgColor:
        "linear-gradient(135deg, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.15) 100%)",
      borderColor: "rgba(255, 255, 255, 0.18)",
    },
  };

  const templateConfig = templates[templateType] || templates.event;
  const finalTitle = title || templateConfig.title;
  const finalSubtitle = subtitle || templateConfig.subtitle;

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${finalTitle}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="font-family: 'Inter', Arial, sans-serif; background-color: #f0f2f5; margin: 0; padding: 0;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <!-- Header with glassmorphism effect -->
    <tr>
      <td align="center" style="padding: 30px 0;">
        <div style="
          background: linear-gradient(135deg, rgba(79,70,229,0.8) 0%, rgba(99,102,241,0.8) 100%);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
          width: 90%;
          max-width: 600px;
          padding: 20px;
          color: white;
        ">
          <h1 style="margin: 0; font-weight: 600; font-size: 24px;">${companyName}</h1>
        {${
          templateType === "event"
            ? `
          <p style="margin: 5px 0 0; font-weight: 300; opacity: 0.9;">${teamName}</p>
          `
            : ""
        }
        </div>
      </td>
    </tr>
    
    <tr>
      <td align="center" style="padding: 0 0 30px;">
        <div style="
          background: ${templateConfig.bgColor};
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 16px;
          border: 1px solid ${templateConfig.borderColor};
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
          width: 90%;
          max-width: 600px;
          padding: 30px;
          margin-top: -15px;
        ">
          <h2 style="margin: 0 0 10px; color: #1f2937; font-weight: 600;">${finalTitle}</h2>
          <p style="margin: 0 0 20px; color: #4b5563; font-size: 15px;">${finalSubtitle}</p>
          
          <div style="
            background: rgba(255, 255, 255, 0.3);
            border-radius: 12px;
            padding: 20px;
            margin: 20px 0;
            border: 1px solid rgba(255, 255, 255, 0.2);
          ">
            ${
              mainContent ||
              `
              ${
                templateType === "verification"
                  ? `
                <p style="font-size: 32px; font-weight: 700; letter-spacing: 5px; text-align: center; margin: 15px 0; color: #111827;">
                  ${userData.code || "123456"}
                </p>
                <p style="font-size: 14px; color: #4b5563; text-align: center;">
                  Este códgio vai expirar em 10 minutos
                </p>
              `
                  : ""
              }
              
              ${
                templateType === "event"
                  ? `
                <p style="font-size: 16px; color: #111827; margin: 0 0 10px;">
                  <strong>Evento:</strong> ${userData.title || "Your Event"}
                </p>
                <p style="font-size: 14px; color: #4b5563; margin: 0 0 10px;">
                  <strong>Hora:</strong> ${
                    new Date(userData.start).toTimeString() || "00:00 AM/PM"
                  }
                </p>
                <p style="font-size: 14px; color: #4b5563; margin: 0 0 20px;">
                  <strong>Duração:</strong> ${
                    userData.eventDuration || "1 hour"
                  }
                </p>
              `
                  : ""
              }
              
              ${
                templateType === "security"
                  ? `
                <p style="font-size: 16px; color: #111827; margin: 0 0 15px;">
                  Detectamos tenativas de login num dispositivo desconhecido:
                </p>
                <p style="font-size: 14px; color: #4b5563; margin: 0 0 5px;">
                  <strong>Location:</strong> ${userData.location || "Unknown"}
                </p>
                <p style="font-size: 14px; color: #4b5563; margin: 0 0 5px;">
                  <strong>Device:</strong> ${
                    userData.device || "Unknown device"
                  }
                </p>
                <p style="font-size: 14px; color: #4b5563; margin: 0 0 15px;">
                  <strong>Time:</strong> ${userData.time || "Just now"}
                </p>
                <p style="font-size: 14px; color: #ef4444; font-weight: 500;">
                  If this wasn't you, please secure your account immediately.
                </p>
              `
                  : ""
              }
            `
            }
          </div>
          
          ${
            actionLink
              ? `
            <a href="${actionLink}" target="_blank" 
               style="
                 display: inline-block;
                 padding: 12px 24px;
                 background: linear-gradient(135deg, rgba(79,70,229,0.9) 0%, rgba(99,102,241,0.9) 100%);
                 color: white;
                 text-decoration: none;
                 border-radius: 8px;
                 font-weight: 500;
                 font-size: 15px;
                 box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
               ">
              ${actionText}
            </a>
          `
              : ""
          }
          
          ${
            secondaryContent
              ? `
            <div style="margin-top: 25px; font-size: 14px; color: #4b5563; line-height: 1.5;">
              ${secondaryContent}
            </div>
          `
              : ""
          }
        </div>
      </td>
    </tr>
    
    <!-- Footer -->
    <tr>
      <td align="center" style="padding: 0 0 30px;">
        <p style="font-size: 12px; color: #9ca3af; max-width: 600px; margin: 0 auto; padding: 0 20px;">
          ${footerNote}<br>
          © ${new Date().getFullYear()} ${companyName}. Todos os direitos reservados
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`;
};
