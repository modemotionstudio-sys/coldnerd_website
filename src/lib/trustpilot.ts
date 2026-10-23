/**
 * Trustpilot TrustBox shown next to the hero Download button.
 *
 * Copy the values from the TrustBox code in Trustpilot Business
 * (Integrations → TrustBox Library → pick a widget → "Get code"):
 *   data-businessunit-id → businessUnitId
 *   data-template-id     → templateId
 *   data-style-height    → height
 *
 * While businessUnitId or templateId is empty, nothing is shown.
 */
export const TRUSTPILOT = {
  businessUnitId: "",
  templateId: "",
  height: "24px",
  profileUrl: "https://www.trustpilot.com/review/coldnerd.com",
};

export const isTrustpilotConfigured = () =>
  Boolean(TRUSTPILOT.businessUnitId && TRUSTPILOT.templateId);
