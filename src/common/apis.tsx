import RNSecureStorage, { ACCESSIBLE } from "rn-secure-storage";

export const getToken = async () => {
  let client_id = await RNSecureStorage.getItem("client_id")
  let client_secret = await RNSecureStorage.getItem("client_secret")
  let apiKey = await RNSecureStorage.getItem("apiKey")
  let uuidKey = await RNSecureStorage.getItem("uuidKey")
  let body = {
    'grant_type': 'client_credentials',
    'client_id': client_id,
    'client_secret': client_secret,
    'scope': 'ob_connect iban_verification income_verification single_api e_statements'
  }
  let data = {
    method: 'POST',
    body: new URLSearchParams(body).toString(),
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded',
      'scope': 'ob_connect iban_verification income_verification single_api e_statements',
      'uuidKey': uuidKey,
      'apiKey': apiKey
    }
  }

  fetch('https://www.qaema.com/sdk/auth/token', data)
    .then(response => response.json())
    .then(data => {
      console.log("data", data); RNSecureStorage.setItem("token", data.token_type + ' ' + data.access_token, { accessible: ACCESSIBLE.WHEN_UNLOCKED }).then((res) => { console.log(res) })
    })
    .catch(error => console.error('Error fetching data:', error));
}

export const getAllAccounts = async (page: Number) => {
  let token = await RNSecureStorage.getItem("token")
  let apiKey = await RNSecureStorage.getItem("apiKey")
  let uuidKey = await RNSecureStorage.getItem("uuidKey")
  let psuid = await RNSecureStorage.getItem("psuid")
  let data = {
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded',
      'scope': 'ob_connect iban_verification income_verification single_api e_statements',
      'uuidKey': uuidKey,
      'apiKey': apiKey,
      'Authorization': token
    }
  }
  let request = await fetch(`https://www.qaema.com/sdk/ob/accounts-information/v1/accounts-links?PSUId=${psuid}&Page=${page}`, data)
    .catch(error => console.error('Error fetching data:', error));
  let response = await request.json()
  return response
}

export const createConsent = async (FinancialInstitutionId: string,userLoginId: string,expiryDate: string) => {
  let token = await RNSecureStorage.getItem("token")
  let apiKey = await RNSecureStorage.getItem("apiKey")
  let uuidKey = await RNSecureStorage.getItem("uuidKey")
  let psuid = await RNSecureStorage.getItem("psuid")

  let dataGroups= [
            {
                "DataGroupId": "AccountDetails",
                "Permissions": [
                    "ReadAccountsBasic",
                    "ReadAccountsDetail",
                    "ReadBalances"
                ]
            },
            {
                "DataGroupId": "RegularPayments",
                "Permissions": [
                    "ReadBeneficiariesBasic",
                    "ReadBeneficiariesDetail",
                    "ReadStandingOrdersBasic",
                    "ReadStandingOrdersDetail",
                    "ReadDirectDebits",
                    "ReadScheduledPaymentsBasic",
                    "ReadScheduledPaymentsDetail"
                ]
            },
            {
                "DataGroupId": "AccountTransactions",
                "Permissions": [
                    "ReadTransactionsCredits",
                    "ReadTransactionsDebits",
                    "ReadTransactionsBasic",
                    "ReadTransactionsDetail"
                ]
            },
            {
                "DataGroupId": "PartyDetails",
                "Permissions": [
                    "ReadParty",
                    "ReadPartyPSUIdentity",
                    "ReadPartyPSU"
                ]
            }
        ]
  let dataBody = {
    'FinancialInstitutionId':FinancialInstitutionId,
    'SecurityProfile':'Redirection',
    'DataGroups':dataGroups,
    'PSUId':psuid,
    'UserLoginId':userLoginId,
    'TransactionFromDateTime':null,
    'TransactionToDateTime':null,
    'ExpirationDateTime':expiryDate,
    "AccountTypesList": ["KSAOB.Retail"],
    "AccountSubTypesList": ["CurrentAccount"],
    "PurposeList": ["Account Aggregation"]
  }
  let body = {
    'Data': dataBody,
  }

  let data = {
    method: 'POST',
    body:JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'scope': 'ob_connect iban_verification income_verification single_api e_statements',
      'uuidKey': uuidKey,
      'apiKey': apiKey,
      'Authorization': token
    }
  }
  let request = await fetch(`https://www.qaema.com/sdk/ob/accounts-information/v1/accounts-links`, data)
    .catch(error => console.error('Error fetching data:', error));
  let response = await request.json()
  return response
}

