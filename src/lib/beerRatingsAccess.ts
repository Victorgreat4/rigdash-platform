const DEFAULT_ALLOWED_USER_IDS = new Set([
  "10651da7-27cd-4a82-9bbe-440fa1bc3e96",
  "91b70910-dcf2-4e1e-b4ce-1f0e244538b6",
]);

const DEFAULT_ALLOWED_EMAILS = new Set([
  "cederstrombjorn@gmail.com",
  "vcl@telia.com",
]);

function parseEnvList(value: string | undefined) {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function canAccessBeerRatings(userId: string, email: string | undefined) {
  const allowedIds = new Set([
    ...DEFAULT_ALLOWED_USER_IDS,
    ...parseEnvList(process.env.FATHER_BEER_ALLOWED_USER_IDS),
  ]);
  const allowedEmails = new Set([
    ...DEFAULT_ALLOWED_EMAILS,
    ...parseEnvList(process.env.FATHER_BEER_ALLOWED_EMAILS).map((entry) =>
      entry.toLowerCase()
    ),
  ]);

  const emailValue = email?.toLowerCase();

  return (
    allowedIds.has(userId) || (emailValue ? allowedEmails.has(emailValue) : false)
  );
}
