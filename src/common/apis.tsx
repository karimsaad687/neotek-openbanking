import RNSecureStorage, { ACCESSIBLE } from "rn-secure-storage";

// export const getToken = async () => {
//   let client_id = await RNSecureStorage.getItem("client_id")
//   let client_secret = await RNSecureStorage.getItem("client_secret")
//   let apiKey = await RNSecureStorage.getItem("apiKey")
//   let uuidKey = await RNSecureStorage.getItem("uuidKey")
//   let body = {
//     'grant_type': 'client_credentials',
//     'client_id': client_id,
//     'client_secret': client_secret,
//     'scope': 'ob_connect iban_verification income_verification single_api e_statements'
//   }
//   let data = {
//     method: 'POST',
//     body: new URLSearchParams(body).toString(),
//     headers: {
//       'Accept': 'application/json, text/plain, */*',
//       'Content-Type': 'application/x-www-form-urlencoded',
//       'scope': 'ob_connect iban_verification income_verification single_api e_statements',
//       'uuidKey': uuidKey,
//       'apiKey': apiKey
//     }
//   }

//   const response = await fetch('https://www.qaema.com/sdk/auth/token', data).catch(error => console.error('Error fetching data:', error));
//   const json = await response.json()
//   await RNSecureStorage.setItem("token", json.token_type + ' ' + json.access_token, { accessible: ACCESSIBLE.WHEN_UNLOCKED }).then((res) => { console.log(res) });
  
// }

export const getInstitutions = async (page: Number) => {
  let token = await RNSecureStorage.getItem("token")
  let apiKey = await RNSecureStorage.getItem("apiKey")
  let uuidKey = await RNSecureStorage.getItem("uuidKey")
  let baseUrl = await RNSecureStorage.getItem("url")
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
  let request = await fetch(`${baseUrl}/sdk/ob/financial-institutions-information/v1/financial-institutions?Page=${page}`, data)
    .catch(error => console.error('Error fetching data:', error));
  let response = await request.json()
  return response
}

export const getAllAccounts = async (page: Number) => {
  let token = await RNSecureStorage.getItem("token")
  let apiKey = await RNSecureStorage.getItem("apiKey")
  let uuidKey = await RNSecureStorage.getItem("uuidKey")
  let psuid = await RNSecureStorage.getItem("psuid")
  let baseUrl = await RNSecureStorage.getItem("url")
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
  let request = await fetch(`${baseUrl}/sdk/ob/accounts-information/v1/accounts-links?PSUId=${psuid}&Page=${page}`, data)
    .catch(error => console.error('Error fetching data:', error));
  let response = await request.json()
  return response
}

export const getAllCurrentAccounts = async (page: Number) => {
  let token = await RNSecureStorage.getItem("token")
  let apiKey = await RNSecureStorage.getItem("apiKey")
  let uuidKey = await RNSecureStorage.getItem("uuidKey")
  let psuid = await RNSecureStorage.getItem("psuid")
  let baseUrl = await RNSecureStorage.getItem("url")
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
  let request = await fetch(`${baseUrl}/sdk/account-link?PSUId=${psuid}&Page=${page}&Status=Active`, data)
    .catch(error => console.error('Error fetching data:', error));
  let response = await request.json()
  return response
}

export const getAllHistoryAccounts = async (page: Number) => {
  let token = await RNSecureStorage.getItem("token")
  let apiKey = await RNSecureStorage.getItem("apiKey")
  let uuidKey = await RNSecureStorage.getItem("uuidKey")
  let psuid = await RNSecureStorage.getItem("psuid")
  let baseUrl = await RNSecureStorage.getItem("url")
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
  let request = await fetch(`${baseUrl}/sdk/account-link?PSUId=${psuid}&Page=${page}&Status=Expired,Rejected`, data)
    .catch(error => console.error('Error fetching data:', error));
  let response = await request.json()
  return response
}

export const getAccount = async (page: Number,id:string) => {
  let token = await RNSecureStorage.getItem("token")
  let apiKey = await RNSecureStorage.getItem("apiKey")
  let uuidKey = await RNSecureStorage.getItem("uuidKey")
  let psuid = await RNSecureStorage.getItem("psuid")
  let baseUrl = await RNSecureStorage.getItem("url")
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
  let request = await fetch(`${baseUrl}/sdk/ob/accounts-information/v1/accounts-links?PSUId=${psuid}&Page=${page}&AccountsLinkId=${id}`, data)
    .catch(error => console.error('Error fetching data:', error));
  let response = await request.json()
  return response
}

export const SpecialBankCodeState = async (query: string) => {
  console.log("query full",`https://api.public.neotek.sa/open-banking/auth/v2/redirection-token/generate?${query}`)
  let request = await fetch(`https://api.public.neotek.sa/open-banking/auth/v2/redirection-token/generate?${query}`)
    .catch(error => console.error('Error fetching data:', error));
  let response = await request.json()
  return response
}


export const createConsent = async (FinancialInstitutionId: string,userLoginId: string,expiryDate: string) => {
  let token = await RNSecureStorage.getItem("token")
  let apiKey = await RNSecureStorage.getItem("apiKey")
  let uuidKey = await RNSecureStorage.getItem("uuidKey")
  let psuid = await RNSecureStorage.getItem("psuid")
  let baseUrl = await RNSecureStorage.getItem("url")
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
  let request = await fetch(`${baseUrl}/sdk/account-link`, data)
    .catch(error => console.error('Error fetching data:', error));
  let response = await request.json()
  return response
}

export const revoke = async (accountsLinkId: string) => {
  let token = await RNSecureStorage.getItem("token")
  let apiKey = await RNSecureStorage.getItem("apiKey")
  let uuidKey = await RNSecureStorage.getItem("uuidKey")
  let psuid = await RNSecureStorage.getItem("psuid")
  let baseUrl = await RNSecureStorage.getItem("url")
  let body = {
    'Data': {},
  }

  let data = {
    method: 'PATCH',
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
  console.log("yes",accountsLinkId)
  let request = await fetch(`${baseUrl}/sdk/sdk/ob/accounts-information/v1/accounts-links/${accountsLinkId}?PSUId=${psuid}&Action=Revoke`, data)
    .catch(error => console.log('Error fetching data:', error));
    console.log("yes2")
  let response = await request.json()
  return response
}

