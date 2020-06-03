type CCPAConsentPayload = {
  demographic: boolean;
  behavioural: boolean;
  programmatic: boolean;
};

type OnSaveCallback = (payload: CCPAConsentPayload) => void;

type Actions = {
  onConsentChange: () => void;
  sendConsent: (
    consentApiUrl: string,
    onConsentSavedCallbacks: OnSaveCallback[]
  ) => Promise<{ _response: _Response }>;
};

type _Response = {
  ok: boolean;
  status?: number;
};
