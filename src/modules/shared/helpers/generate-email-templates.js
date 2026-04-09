const DEFAULT_COMPANY_NAME = "TeoChat";
const DEFAULT_FOOTER_NOTE =
  "Esta mensagem foi enviada automaticamente. Se precisar de ajuda, entre em contacto com a sua equipa.";

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const normalizeText = (value, fallback = "") => {
  if (value === undefined || value === null) return fallback;

  const normalized = String(value).trim();
  return normalized || fallback;
};

const getSafeLink = (value) => {
  const normalized = normalizeText(value);

  if (!normalized) return "";

  return /^https?:\/\//i.test(normalized) ? normalized : "";
};

const formatDate = (value) => {
  if (!value) return "A confirmar";

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return escapeHtml(normalizeText(value, "A confirmar"));
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "full",
    timeZone: "Africa/Luanda",
  }).format(parsedDate);
};

const formatTime = (value) => {
  const normalized = normalizeText(value);
  if (!normalized) return "A confirmar";

  const dateTimeMatch = normalized.match(/T(\d{2}:\d{2})/);
  if (dateTimeMatch) return escapeHtml(dateTimeMatch[1]);

  const timeMatch = normalized.match(/^(\d{1,2}:\d{2})/);
  if (timeMatch) return escapeHtml(timeMatch[1]);

  const parsedDate = new Date(normalized);
  if (!Number.isNaN(parsedDate.getTime())) {
    return new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Africa/Luanda",
    }).format(parsedDate);
  }

  return escapeHtml(normalized);
};

const renderActionButton = (actionLink, actionText) => {
  const safeLink = getSafeLink(actionLink);
  const safeText = escapeHtml(normalizeText(actionText));

  if (!safeLink || !safeText) return "";

  return `
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin: 24px auto 0;">
      <tr>
        <td align="center" bgcolor="#0f766e" style="border-radius: 10px;">
          <a
            href="${safeLink}"
            target="_blank"
            rel="noopener noreferrer"
            style="display: inline-block; padding: 14px 24px; font-size: 15px; font-weight: 600; color: #ffffff; text-decoration: none;"
          >
            ${safeText}
          </a>
        </td>
      </tr>
    </table>
  `;
};

const renderEmailLayout = ({
  companyName,
  title,
  subtitle,
  accentColor,
  badge,
  bodyContent,
  actionLink,
  actionText,
  secondaryContent,
  footerNote,
}) => {
  const safeCompanyName = escapeHtml(
    normalizeText(companyName, DEFAULT_COMPANY_NAME),
  );
  const safeTitle = escapeHtml(normalizeText(title, "Notificação TeoChat"));
  const safeSubtitle = escapeHtml(normalizeText(subtitle));
  const safeFooterNote = escapeHtml(
    normalizeText(footerNote, DEFAULT_FOOTER_NOTE),
  );

  return `
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>${safeTitle}</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4f7fb; font-family: Arial, Helvetica, sans-serif; color: #0f172a;">
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f7fb;">
      <tr>
        <td align="center" style="padding: 32px 16px;">
          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 640px;">
            <tr>
              <td style="padding-bottom: 18px; text-align: center;">
                <p style="margin: 0; font-size: 13px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: ${accentColor};">
                  ${safeCompanyName}
                </p>
              </td>
            </tr>
            <tr>
              <td style="background-color: #ffffff; border: 1px solid #dbe4ee; border-radius: 20px; overflow: hidden; box-shadow: 0 14px 40px rgba(15, 23, 42, 0.06);">
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding: 32px 32px 24px; background: linear-gradient(135deg, #ecfeff 0%, #f8fafc 100%); border-bottom: 1px solid #e2e8f0;">
                      <p style="margin: 0 0 14px; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: ${accentColor};">
                        ${escapeHtml(normalizeText(badge, "Notificação"))}
                      </p>
                      <h1 style="margin: 0 0 10px; font-size: 28px; line-height: 1.25; color: #0f172a;">
                        ${safeTitle}
                      </h1>
                      ${
                        safeSubtitle
                          ? `<p style="margin: 0; font-size: 15px; line-height: 1.7; color: #475569;">${safeSubtitle}</p>`
                          : ""
                      }
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 32px;">
                      ${bodyContent}
                      ${renderActionButton(actionLink, actionText)}
                      ${
                        secondaryContent
                          ? `<div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 14px; line-height: 1.7; color: #475569;">${secondaryContent}</div>`
                          : ""
                      }
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 18px 10px 0; text-align: center;">
                <p style="margin: 0; font-size: 12px; line-height: 1.7; color: #64748b;">
                  ${safeFooterNote}
                </p>
                <p style="margin: 8px 0 0; font-size: 12px; line-height: 1.7; color: #94a3b8;">
                  &copy; ${new Date().getFullYear()} ${safeCompanyName}. Todos os direitos reservados.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
};

export const generateEmailTemplate = ({
  templateType = "convite",
  title,
  subtitle,
  mainContent,
  actionLink,
  actionText,
  companyName = DEFAULT_COMPANY_NAME,
  secondaryContent,
  footerNote = DEFAULT_FOOTER_NOTE,
  userData = {},
}) => {
  const safeCompanyName = normalizeText(companyName, DEFAULT_COMPANY_NAME);
  const userName = normalizeText(userData.name, "utilizador");
  const safeInviter = escapeHtml(
    normalizeText(userData.inviter, "um administrador da plataforma"),
  );
  const safeDevice = escapeHtml(normalizeText(userData.device, "Não identificado"));
  const safeLocation = escapeHtml(
    normalizeText(userData.location, "Localização indisponível"),
  );
  const safeCode = escapeHtml(normalizeText(userData.code));

  const templates = {
    convite: {
      badge: "Convite",
      title: `Convite para entrar na empresa ${safeCompanyName}`,
      subtitle: `Recebeu um convite para colaborar com a empresa ${safeCompanyName} no TeoChat.`,
      accentColor: "#0f766e",
      bodyContent: `
        <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.7; color: #334155;">
          <strong style="color: #0f172a;">${safeInviter}</strong> convidou-o(a) para se juntar à empresa
          <strong style="color: #0f172a;">${escapeHtml(safeCompanyName)}</strong>.
        </p>
        <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #475569;">
          Ao aceitar o convite, terá acesso ao espaço de trabalho da equipa e poderá começar a colaborar imediatamente.
        </p>
      `,
      actionText: "Aceitar convite",
    },
    welcome: {
      badge: "Conta ativada",
      title: `Bem-vindo(a) ao ${safeCompanyName}`,
      subtitle: `A sua conta foi confirmada com sucesso, ${userName}.`,
      accentColor: "#2563eb",
      bodyContent: `
        <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.7; color: #334155;">
          A sua conta está pronta para utilização. Já pode entrar no ${escapeHtml(safeCompanyName)} e começar a organizar conversas, equipas e projetos.
        </p>
        <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #475569;">
          Se estiver a entrar pela primeira vez, recomendamos rever as suas equipas e notificações para configurar a experiência ideal.
        </p>
      `,
      actionText: "Aceder à plataforma",
    },
    verification: {
      badge: "Verificação",
      title: "Verifique a sua conta",
      subtitle:
        "Use o código abaixo para concluir a verificação. Por motivos de segurança, este código expira em 10 minutos.",
      accentColor: "#ca8a04",
      bodyContent: safeCode
        ? `
          <div style="margin: 0 0 18px; padding: 18px; border: 1px solid #fde68a; border-radius: 16px; background-color: #fffbeb; text-align: center;">
            <p style="margin: 0 0 8px; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; color: #a16207;">
              Código de confirmação
            </p>
            <p style="margin: 0; font-size: 34px; font-weight: 700; letter-spacing: 0.18em; color: #92400e;">
              ${safeCode}
            </p>
          </div>
          <p style="margin: 0; font-size: 14px; line-height: 1.7; color: #475569;">
            Se não reconhece esta ação, ignore esta mensagem e proteja o acesso à sua conta.
          </p>
        `
        : `
          <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #475569;">
            O código de verificação não pôde ser apresentado nesta mensagem. Solicite um novo código para continuar com segurança.
          </p>
        `,
    },
    resetPassword: {
      badge: "Segurança",
      title: "Recuperação de senha",
      subtitle:
        "Recebemos um pedido para redefinir a senha da sua conta.",
      accentColor: "#dc2626",
      bodyContent: `
        <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.7; color: #334155;">
          Clique no botão abaixo para criar uma nova senha. Se não fez este pedido, pode ignorar esta mensagem com segurança.
        </p>
        <p style="margin: 0; font-size: 14px; line-height: 1.7; color: #64748b;">
          Por segurança, o link de recuperação deve ser utilizado o mais cedo possível.
        </p>
      `,
      actionText: "Redefinir senha",
    },
    security: {
      badge: "Alerta de segurança",
      title: "Atividade suspeita detetada",
      subtitle: `Encontrámos uma tentativa de acesso incomum na conta de ${userName}.`,
      accentColor: "#7c3aed",
      bodyContent: `
        <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.7; color: #334155;">
          Revise os detalhes abaixo. Se não reconhece esta atividade, altere a sua senha imediatamente.
        </p>
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border: 1px solid #e2e8f0; border-radius: 14px; background-color: #f8fafc;">
          <tr>
            <td style="padding: 14px 16px; font-size: 14px; color: #334155;">
              <strong style="color: #0f172a;">Dispositivo:</strong> ${safeDevice}
            </td>
          </tr>
          <tr>
            <td style="padding: 0 16px 14px; font-size: 14px; color: #334155;">
              <strong style="color: #0f172a;">Localização:</strong> ${safeLocation}
            </td>
          </tr>
        </table>
      `,
      actionText: "Proteger conta",
    },
  };

  const config = templates[templateType] || templates.convite;

  return renderEmailLayout({
    companyName: safeCompanyName,
    title: normalizeText(title, config.title),
    subtitle: normalizeText(subtitle, config.subtitle),
    accentColor: config.accentColor,
    badge: config.badge,
    bodyContent: mainContent || config.bodyContent,
    actionLink,
    actionText: normalizeText(actionText, config.actionText),
    secondaryContent,
    footerNote,
  });
};

export const upcomingEventTemplate = ({
  teamName,
  companyName,
  eventName,
  eventDate,
  eventTime,
  eventLink,
}) => {
  const normalizedTeamName = normalizeText(teamName, "Sua equipa");
  const safeCompanyName = normalizeText(companyName, DEFAULT_COMPANY_NAME);
  const normalizedEventName = normalizeText(eventName, "evento da equipa");
  const safeTeamName = escapeHtml(normalizedTeamName);
  const safeEventName = escapeHtml(normalizedEventName);
  const safeEventDate = formatDate(eventDate);
  const safeEventTime = formatTime(eventTime);

  return renderEmailLayout({
    companyName: safeCompanyName,
    title: "Lembrete de evento",
    subtitle: `O evento ${normalizedEventName} está a aproximar-se.`,
    badge: "Agenda",
    accentColor: "#0f766e",
    bodyContent: `
      <p style="margin: 0 0 18px; font-size: 15px; line-height: 1.7; color: #334155;">
        Este é um lembrete para que se possa preparar com antecedência e participar sem imprevistos.
      </p>
      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border: 1px solid #dbe4ee; border-radius: 16px; background-color: #f8fafc;">
        <tr>
          <td style="padding: 18px 18px 10px; font-size: 14px; line-height: 1.7; color: #334155;">
            <strong style="color: #0f172a;">Evento:</strong> ${safeEventName}
          </td>
        </tr>
        <tr>
          <td style="padding: 0 18px 10px; font-size: 14px; line-height: 1.7; color: #334155;">
            <strong style="color: #0f172a;">Equipa:</strong> ${safeTeamName}
          </td>
        </tr>
        <tr>
          <td style="padding: 0 18px 10px; font-size: 14px; line-height: 1.7; color: #334155;">
            <strong style="color: #0f172a;">Empresa:</strong> ${escapeHtml(safeCompanyName)}
          </td>
        </tr>
        <tr>
          <td style="padding: 0 18px 10px; font-size: 14px; line-height: 1.7; color: #334155;">
            <strong style="color: #0f172a;">Data:</strong> ${safeEventDate}
          </td>
        </tr>
        <tr>
          <td style="padding: 0 18px 18px; font-size: 14px; line-height: 1.7; color: #334155;">
            <strong style="color: #0f172a;">Hora:</strong> ${safeEventTime}
          </td>
        </tr>
      </table>
    `,
    actionLink: eventLink,
    actionText: "Abrir plataforma",
    secondaryContent:
      "<p style='margin: 0;'>Recebeu este lembrete porque faz parte da equipa associada a este evento.</p>",
    footerNote:
      "Se os detalhes deste evento foram alterados recentemente, consulte a plataforma para ver a versão mais atualizada.",
  });
};
