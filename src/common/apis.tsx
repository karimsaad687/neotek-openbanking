import RNSecureStorage from 'rn-secure-storage';
import { ACCESSIBLE } from 'rn-secure-storage';

export const getToken = async () => {
  const client_id = await RNSecureStorage.getItem('client_id');
  const client_secret = await RNSecureStorage.getItem('client_secret');
  const apiKey = await RNSecureStorage.getItem('apiKey');
  const uuidKey = await RNSecureStorage.getItem('uuidKey');

  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: client_id || '',
    client_secret: client_secret || '',
    scope:
      'ob_connect iban_verification income_verification single_api e_statements',
  }).toString();

  const data = {
    method: 'POST',
    body,
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded',
      'scope':
        'ob_connect iban_verification income_verification single_api e_statements',
      'uuidKey': uuidKey || '',
      'apiKey': apiKey || '',
    },
  };

  const response = await fetch('https://www.qaema.com/sdk/auth/token', data);
  const json = await response.json();
  await RNSecureStorage.setItem(
    'token',
    `${json.token_type} ${json.access_token}`,
    { accessible: ACCESSIBLE.WHEN_UNLOCKED }
  );
};

export const getInstitutions = async (page: number) => {
  const token = (await RNSecureStorage.getItem('token')) || '';
  const apiKey = (await RNSecureStorage.getItem('apiKey')) || '';
  const uuidKey = (await RNSecureStorage.getItem('uuidKey')) || '';
  const baseUrl = (await RNSecureStorage.getItem('url')) || '';

  const data = {
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded',
      'scope':
        'ob_connect iban_verification income_verification single_api e_statements',
      'uuidKey': uuidKey,
      'apiKey': apiKey,
      'Authorization': token,
    },
  };

  const response = await fetch(
    `${baseUrl}/sdk/ob/financial-institutions-information/v1/financial-institutions?Page=${page}`,
    data
  );
  return await response.json();
};

export const getAllAccounts = async (page: number) => {
  const token = (await RNSecureStorage.getItem('token')) || '';
  const apiKey = (await RNSecureStorage.getItem('apiKey')) || '';
  const uuidKey = (await RNSecureStorage.getItem('uuidKey')) || '';
  const psuid = (await RNSecureStorage.getItem('psuid')) || '';
  const baseUrl = (await RNSecureStorage.getItem('url')) || '';

  const data = {
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded',
      'scope':
        'ob_connect iban_verification income_verification single_api e_statements',
      'uuidKey': uuidKey,
      'apiKey': apiKey,
      'Authorization': token,
    },
  };

  const response = await fetch(
    `${baseUrl}/sdk/ob/accounts-information/v1/accounts-links?PSUId=${psuid}&Page=${page}`,
    data
  );
  return await response.json();
};

export const getAllCurrentAccounts = async (page: number) => {
  const token = (await RNSecureStorage.getItem('token')) || '';
  const apiKey = (await RNSecureStorage.getItem('apiKey')) || '';
  const uuidKey = (await RNSecureStorage.getItem('uuidKey')) || '';
  const psuid = (await RNSecureStorage.getItem('psuid')) || '';
  const baseUrl = (await RNSecureStorage.getItem('url')) || '';

  const data = {
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded',
      'scope':
        'ob_connect iban_verification income_verification single_api e_statements',
      'uuidKey': uuidKey,
      'apiKey': apiKey,
      'Authorization': token,
    },
  };

  const response = await fetch(
    `${baseUrl}/sdk/account-link?PSUId=${psuid}&Page=${page}&Status=Active`,
    data
  );
  return await response.json();
};

export const getAllHistoryAccounts = async (page: number) => {
  const token = (await RNSecureStorage.getItem('token')) || '';
  const apiKey = (await RNSecureStorage.getItem('apiKey')) || '';
  const uuidKey = (await RNSecureStorage.getItem('uuidKey')) || '';
  const psuid = (await RNSecureStorage.getItem('psuid')) || '';
  const baseUrl = (await RNSecureStorage.getItem('url')) || '';

  const data = {
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded',
      'scope':
        'ob_connect iban_verification income_verification single_api e_statements',
      'uuidKey': uuidKey,
      'apiKey': apiKey,
      'Authorization': token,
    },
  };

  const response = await fetch(
    `${baseUrl}/sdk/account-link?PSUId=${psuid}&Page=${page}&Status=Expired,Rejected`,
    data
  );
  return await response.json();
};

export const getAccount = async (page: number, id: string) => {
  const token = (await RNSecureStorage.getItem('token')) || '';
  const apiKey = (await RNSecureStorage.getItem('apiKey')) || '';
  const uuidKey = (await RNSecureStorage.getItem('uuidKey')) || '';
  const psuid = (await RNSecureStorage.getItem('psuid')) || '';
  const baseUrl = (await RNSecureStorage.getItem('url')) || '';

  const data = {
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded',
      'scope':
        'ob_connect iban_verification income_verification single_api e_statements',
      'uuidKey': uuidKey,
      'apiKey': apiKey,
      'Authorization': token,
    },
  };

  const response = await fetch(
    `${baseUrl}/sdk/ob/accounts-information/v1/accounts-links?PSUId=${psuid}&Page=${page}&AccountsLinkId=${id}`,
    data
  );
  return await response.json();
};

export const SpecialBankCodeState = async (query: string) => {
  const response = await fetch(
    `https://api.public.neotek.sa/open-banking/auth/v2/redirection-token/generate?${query}`
  );
  return await response.json();
};

export const createConsent = async (
  FinancialInstitutionId: string,
  userLoginId: string,
  expiryDate: string
) => {
  const token = (await RNSecureStorage.getItem('token')) || '';
  const apiKey = (await RNSecureStorage.getItem('apiKey')) || '';
  const uuidKey = (await RNSecureStorage.getItem('uuidKey')) || '';
  const psuid = (await RNSecureStorage.getItem('psuid')) || '';
  const baseUrl = (await RNSecureStorage.getItem('url')) || '';

  const dataGroups = [
    {
      DataGroupId: 'AccountDetails',
      Permissions: ['ReadAccountsBasic', 'ReadAccountsDetail', 'ReadBalances'],
    },
    {
      DataGroupId: 'RegularPayments',
      Permissions: [
        'ReadBeneficiariesBasic',
        'ReadBeneficiariesDetail',
        'ReadStandingOrdersBasic',
        'ReadStandingOrdersDetail',
        'ReadDirectDebits',
        'ReadScheduledPaymentsBasic',
        'ReadScheduledPaymentsDetail',
      ],
    },
    {
      DataGroupId: 'AccountTransactions',
      Permissions: [
        'ReadTransactionsCredits',
        'ReadTransactionsDebits',
        'ReadTransactionsBasic',
        'ReadTransactionsDetail',
      ],
    },
    {
      DataGroupId: 'PartyDetails',
      Permissions: ['ReadParty', 'ReadPartyPSUIdentity', 'ReadPartyPSU'],
    },
  ];

  const body = {
    Data: {
      FinancialInstitutionId,
      SecurityProfile: 'Redirection',
      DataGroups: dataGroups,
      PSUId: psuid,
      UserLoginId: userLoginId,
      TransactionFromDateTime: null,
      TransactionToDateTime: null,
      ExpirationDateTime: expiryDate,
      AccountTypesList: ['KSAOB.Retail'],
      AccountSubTypesList: ['CurrentAccount'],
      PurposeList: ['Account Aggregation'],
    },
  };

  const data = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'scope':
        'ob_connect iban_verification income_verification single_api e_statements',
      'uuidKey': uuidKey,
      'apiKey': apiKey,
      'Authorization': token,
    },
  };

  const response = await fetch(`${baseUrl}/sdk/account-link`, data);
  return await response.json();
};

export const revoke = async (accountsLinkId: string) => {
  const token = (await RNSecureStorage.getItem('token')) || '';
  const apiKey = (await RNSecureStorage.getItem('apiKey')) || '';
  const uuidKey = (await RNSecureStorage.getItem('uuidKey')) || '';
  const psuid = (await RNSecureStorage.getItem('psuid')) || '';
  const baseUrl = (await RNSecureStorage.getItem('url')) || '';

  const body = { Data: {} };

  const data = {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'scope':
        'ob_connect iban_verification income_verification single_api e_statements',
      'uuidKey': uuidKey,
      'apiKey': apiKey,
      'Authorization': token,
    },
  };

  const response = await fetch(
    `${baseUrl}/sdk/sdk/ob/accounts-information/v1/accounts-links/${accountsLinkId}?PSUId=${psuid}&Action=Revoke`,
    data
  );
  return await response.json();
};
